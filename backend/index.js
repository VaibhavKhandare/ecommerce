const cors = require('cors');
const express = require('express')
const dotenv = require("dotenv")
dotenv.config({path: './config.env'});


const {show,showAll,showIndex, showPage,addProduct,editProduct,removeProduct} = require('./db/product')
const {showAllUsers, createUser, loginUser, addToCart, removeFromCart, searchUser} = require('./db/user')
const {showSliders,addSlider, removeSlider, editSlider} = require('./db/HomePage/slider')
const {showAnalysis, increaseAnalysisData} = require('./db/Analysis')
const {showcategory, addCategory, editCategory, removeCategory} = require('./db/HomePage/categories')
const {showFilter} = require('./db/HomePage/Filter')

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
event.on('visited',()=>{
    showAnalysis({}).then(res=>{
        res.visited= res.visited ? res.visited +1 : 1;
        increaseAnalysisData(res);
    })
})


const app =express();
app.use(cors());
app.use(express.json())

app.get('/search/all/:key',async (req,res)=>{
    const data = show({key:req.params.key})
    res.send(data);
})

app.get('/search/all',async (req,res)=>{
    const data = await showAll({key:{}})
    res.send(data);
})

app.get('/search',async (req,res)=>{
    const pageNo = req.query.pageNo || 1
    event.emit('filter searched', req.query);
    const data = await showPage({key:req.query},pageNo)
    res.send(data);
})
app.get('/product/:id',async (req,res)=>{
    const data = await showIndex(req.params.id);
    res.send(data);
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
    event.emit('visited')
    const data = await showSliders(req.query)
    res.send(data);
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

app.post('/data/product/add',async(req,res)=>{
    const data = await addProduct(req.body)
    res.send(data);
});

app.post('/data/product/edit',async(req,res)=>{
    const data = await editProduct(req.body)
    res.send(data);
});

app.post('/data/product/remove',async(req,res)=>{
    const data = await removeProduct(req.body)
    res.send(data);
});

app.get('/data/analysis/',async(req,res)=>{
    const data = await showAnalysis({})
    res.send(data);
});


app.get('/data/filter',async(req,res)=>{
    const data = await showFilter(req.query)
    res.send(data);
})
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
   }


const PORT = process.env.PORT || 4000
app.listen(PORT)
