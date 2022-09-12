const cors = require('cors');
const express = require('express')
const {show,showAll,showIndex, showPage} = require('./db/product')
const {showAllUsers, createUser, loginUser} = require('./db/user')


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

app.post('/users/login',async(req,res)=>{
    res.send(await loginUser(req.body));
})

app.listen(4000)
