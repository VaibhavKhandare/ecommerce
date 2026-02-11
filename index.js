const cors = require('cors');
const express = require('express')
const path = require('path');
const dotenv = require("dotenv")
dotenv.config({path: './config.env'});


const { show, showAll, showIndex, showByIds, showPage, addProduct, editProduct, removeProduct, reduceItemCount, applyFiltersInMemory } = require('./db/product')
const {showAllUsers, createUser, loginUser, addToCart, removeFromCart, searchUser, addToBuy} = require('./db/user')
const {showAllBuys, createBuy} = require('./db/admin')
const {showSliders,addSlider, removeSlider, editSlider} = require('./db/HomePage/slider')
const {showAnalysis, increaseAnalysisData} = require('./db/Analysis')
const {showcategory, addCategory, editCategory, removeCategory} = require('./db/HomePage/categories')
const { showFilter, buildAndSaveFilter, getFilterDynamic } = require('./db/HomePage/Filter')

const EventEmitter = require('events')
const event = new EventEmitter();
event.on('filter searched',(stringData)=>{
    showAnalysis({}).then(res=>{
        let flag = false;
        if(stringData.search){
            flag = true
            res.search[stringData.search] = res.category[stringData.search] ?  res.category[stringData.search]+1: 1;
        }
        if(stringData.category){
            flag = true
            const categoryArray = stringData.category.split(',');
            categoryArray.forEach((val)=>{
                res.category[val] = res.category[val] ?  res.category[val]+1: 1;
            })
        }
        if(stringData.brand){
            flag = true
            const brandArray = stringData.brand.split(',');
            brandArray.forEach((val)=>{
                res.brand[val] = res.brand[val] ?  res.brand[val]+1: 1;
            })
        }
        if(stringData.color){
            flag = true
            const colorArray = stringData.color.split(',');
            colorArray.forEach((val)=>{
                res.color[val] = res.color[val] ?  res.color[val]+1: 1;
            })
        }
        if(flag){
            increaseAnalysisData(res)
        };
    })
});


const app =express();
app.use(cors());
app.use(express.json())

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const NLP_SERVICE_URL = process.env.NLP_SERVICE_URL || 'http://localhost:8000'

app.get('/search/all/:key',async (req,res)=>{
    const data = show({key:req.params.key})
    res.send(data);
})

app.get('/search/all',async (req,res)=>{
    const data = await showAll({key:{}})
    res.send(data);
})

function normalizeQuery(q) {
    const key = { ...q };
    if (Array.isArray(key.price)) key.price = key.price.slice(0, 2).join(',');
    else if (key.price == null) key.price = '';
    if (Array.isArray(key.category)) key.category = key.category.join(',');
    if (Array.isArray(key.brand)) key.brand = key.brand.join(',');
    if (Array.isArray(key.color)) key.color = key.color.join(',');
    return key;
}

app.get('/search', async (req, res) => {
    const pageNo = req.query.pageNo || 1;
    const limit = req.query.limit || 20;
    const searchTerm = (req.query.search || '').trim();
    const key = normalizeQuery(req.query);
    if (searchTerm) {
        try {
            event.emit('filter searched', req.query);
            const data = await semanticSearch(searchTerm, pageNo, limit, key);
            return res.send(data);
        } catch (e) {
            return res.status(502).send({ error: 'Semantic search failed', message: e.message });
        }
    }
    event.emit('filter searched', req.query);
    const data = await showPage({ key }, pageNo);
    res.send(data);
})

async function semanticSearch(q, pageNo = 1, limit = 20, key = {}) {
    const query = (q || '').trim().toLowerCase();
    if (!query) return { data: [], pageNo: 1, totalPage: 0 };
    const pageNoInt = Math.max(1, parseInt(pageNo) || 1);
    const limitInt = Math.min(50, Math.max(1, parseInt(limit) || 20));
    const hasFilters = key.price || key.category || key.brand || key.color;
    const requested = hasFilters ? Math.min(500, 50 * 10) : Math.min(pageNoInt * limitInt, 200);
    const r = await fetch(`${NLP_SERVICE_URL}/search?q=${encodeURIComponent(query)}&limit=${requested}`);
    if (!r.ok) throw new Error('NLP service unavailable');
    const { results } = await r.json();
    const scoreById = new Map((results || []).map((x) => [x.productId, x.score]));
    const ids = (results || []).map((x) => x.productId).filter(Boolean);
    let products = await showByIds(ids.length ? ids : []);
    if (hasFilters) products = applyFiltersInMemory(products, key);
    products.sort((a, b) => (scoreById.get(b._id.toString()) || 0) - (scoreById.get(a._id.toString()) || 0));
    const total = products.length;
    const start = (pageNoInt - 1) * limitInt;
    const pageProducts = products.slice(start, start + limitInt);
    const data = pageProducts.map((p) => {
        const doc = p.toObject ? p.toObject() : { ...p };
        doc.score = Math.round((scoreById.get(p._id.toString()) || 0) * 10000) / 10000;
        return doc;
    });
    return { data, pageNo: pageNoInt, totalPage: total };
}

app.get('/search/semantic', async (req, res) => {
    try {
        const out = await semanticSearch(req.query.q, req.query.pageNo, req.query.limit);
        res.send(out);
    } catch (e) {
        res.status(502).send({ error: 'Semantic search failed', message: e.message });
    }
})

app.post('/search/reindex', async (req, res) => {
    try {
        const products = await showAll({ key: {} });
        const payload = products.map(p => ({
            id: p._id.toString(),
            name: p.name,
            brand: p.brand,
            description: p.description,
        }));
        const r = await fetch(`${NLP_SERVICE_URL}/index`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ products: payload }),
        });
        if (!r.ok) {
            const err = await r.text();
            return res.status(502).send({ error: 'NLP index failed', detail: err });
        }
        const out = await r.json();
        await buildAndSaveFilter();
        res.send({ indexed: out.indexed });
    } catch (e) {
        res.status(502).send({ error: 'Reindex failed', message: e.message });
    }
})

app.get('/product/:id', async (req, res) => {
    const data = await showIndex(req.params.id);
    res.send(data);
})

// Similar products: embedding similarity + optional preference memory (personalizes via semantic query)
app.get('/product/:id/similar', async (req, res) => {
    try {
        const product = await showIndex(req.params.id);
        if (!product) return res.status(404).send({ error: 'Product not found' });
        const preference = (req.query.preference || req.query.memory || '').trim();
        const text = [product.name, product.brand, product.description].filter(Boolean).join(' ');
        const q = preference ? `${preference} ${text}` : text;
        const r = await fetch(`${NLP_SERVICE_URL}/search?q=${encodeURIComponent(q)}&limit=21`);
        if (!r.ok) throw new Error('NLP service unavailable');
        const { results } = await r.json();
        const ids = (results || []).map((x) => x.productId).filter((id) => id !== product._id.toString()).slice(0, 20);
        const products = await showByIds(ids);
        const byId = new Map(products.map((p) => [p._id.toString(), p]));
        const data = ids.map((id) => byId.get(id)).filter(Boolean).map((p) => (p.toObject ? p.toObject() : { ...p }));
        res.send(data);
    } catch (e) {
        res.status(502).send({ error: 'Similar products failed', message: e.message });
    }
})

app.get('/users',async(req,res)=>{
    const data = await showAllUsers();
    res.send(data);
})

app.post('/users/create',async(req,res)=>{
    res.send(await createUser(req.body));
})

app.get('/user/:id',async(req,res)=>{
    res.send( await searchUser(req.params.id));
})

app.post('/users/login',async(req,res)=>{
    res.send(await loginUser(req.body));
})

app.get('/cart/add',async(req,res)=>{
    const data = await addToCart(req.query)
    res.send({data, status: 1});
});

app.get('/cart/remove',async(req,res)=>{
    const data = await removeFromCart(req.query)
    res.send({data, status: 1});
});

app.get('/data/slider',async(req,res)=>{
    const data = await showSliders(req.query)
    res.send(data);
    showAnalysis({}).then(res=>{
        res.visited= res?.visited ? res.visited +1 : 1;
        increaseAnalysisData(res);
    })
});

app.post('/data/slider/add',async(req,res)=>{
    const data = await addSlider(req.body)
    res.send(data);
});

app.post('/data/slider/edit',async(req,res)=>{
    const data = await editSlider(req.body)
    res.send(data);
});

app.post('/data/slider/remove',async(req,res)=>{
    const data = await removeSlider(req.body)
    res.send(data);
});

app.get('/data/category',async(req,res)=>{
    const data = await showcategory(req.query)
    res.send(data);
});

app.get('/buy/product/:id',async(req,res)=>{
    res.send( await reduceItemCount({_id: req.params.id}));
    res.send(data);
});

app.post('/data/category/add',async(req,res)=>{
    const data = await addCategory(req.body)
    res.send(data);
});

app.post('/data/category/edit',async(req,res)=>{
    const data = await editCategory(req.body)
    res.send(data);
});

app.post('/data/category/remove',async(req,res)=>{
    const data = await removeCategory(req.body)
    res.send(data);
});

async function indexProducts(products) {
    if (!products.length) return;
    const payload = products.map((p) => ({
        id: (p._id || p.id).toString(),
        name: p.name || '',
        brand: p.brand || '',
        description: p.description || '',
    }));
    try {
        await fetch(`${NLP_SERVICE_URL}/index`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ products: payload }),
        });
    } catch (_) {}
}

async function deleteFromIndex(productIds) {
    if (!productIds.length) return;
    try {
        await fetch(`${NLP_SERVICE_URL}/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productIds: productIds.map(String) }),
        });
    } catch (_) {}
}

app.post('/data/product/add', async (req, res) => {
    const data = await addProduct(req.body);
    res.send(data);
    if (data.status === 1 && data.doc) {
        indexProducts([data.doc]);
    }
});

app.post('/data/product/edit', async (req, res) => {
    const data = await editProduct(req.body);
    res.send(data);
    if (data.status === 1 && req.body._id) {
        indexProducts([{ _id: req.body._id, name: req.body.name, brand: req.body.brand, description: req.body.description }]);
    }
});

app.post('/data/product/remove', async (req, res) => {
    const data = await removeProduct(req.body);
    res.send(data);
    if (data.status === 1 && req.body._id) {
        deleteFromIndex([req.body._id]);
    }
});

app.get('/data/analysis/',async(req,res)=>{
    const data = await showAnalysis({})
    res.send(data);
});

const emptyFilterResponse = () => ({ checkBoxesData: {}, priceRange: [0, 20000] });

app.get('/data/filter', async (req, res) => {
    try {
        const key = normalizeQuery(req.query);
        const raw = await getFilterDynamic(key);
        if (!raw) {
            const built = await buildAndSaveFilter();
            return res.json(built || emptyFilterResponse());
        }
        const data = raw;
        const payload = {
            checkBoxesData: data.checkBoxesData ?? {},
            priceRange: Array.isArray(data.priceRange) && data.priceRange.length >= 2 ? data.priceRange : [0, 20000],
        };
        res.json(payload);
    } catch (e) {
        res.status(500).json(emptyFilterResponse());
    }
});

app.post('/data/filter/rebuild', async (req, res) => {
    try {
        const payload = await buildAndSaveFilter();
        res.send(payload ? { ok: true } : { ok: false });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

app.get('/buy/all',async(req,res)=>{
    const data = await showAllBuys(req.query)
    res.send(data);
})

app.get('/buy/balance',async(req,res)=>{
    res.send(await stripe.balance.retrieve());
})

app.post('/buy/add',async(req,res)=>{
    createBuy(req.body)
    const data = await addToBuy(req.body)
    res.send(data);
})

app.post('/buy/checkout',async(req,res)=>{
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item=>{
                return {
                    price_data: {
                        currency: 'inr',
                        product_data:{name: item.name},
                        unit_amount: item.price*100,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.SERVER_URL}`,
            cancel_url:  `${process.env.SERVER_URL}`,
        })
        res.send({url:session.url })
    }catch(e){
        res.send({error: e.msg})
    }
})
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' || process.env.NODE_ENV !== 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));    
    });
}



const PORT = process.env.PORT || 4000
app.listen(PORT)
