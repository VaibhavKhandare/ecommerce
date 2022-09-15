const cors = require('cors');
const express = require('express')
const {show,showAll,showIndex, showPage} = require('./db/product')
const {showAllUsers, createUser, loginUser, addToCart, removeFromCart, searchUser} = require('./db/user')
const {showSliders} = require('./db/HomePage/slider')
const {showcategory} = require('./db/HomePage/categories')
const {showFilter} = require('./db/HomePage/Filter')

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
    const data = await showSliders(req.query)
    res.send(data);
});

app.get('/data/category',async(req,res)=>{
    const data = await showcategory(req.query)
    res.send(data);
});



app.get('/data/filter',async(req,res)=>{
    const data = await showFilter(req.query)
    res.send(data);
});

app.listen(4000)
