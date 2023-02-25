const mongoose = require("mongoose");
require('./config');

const UserSchema = new mongoose.Schema({
    name: {type: String,unique: true},
    email: {type: String,unique: true},
    password: String,
    cart: Array,
    buy: Array,
});
const UserModel = mongoose.model('users', UserSchema);

const showAllUsers = async ()=>{
    const data = await UserModel.find({});
    return data
}

const createUser = async (userData)=>{
    try{
        const data = await UserModel.create(userData);
        const {name, _id} = data;
        return {status: 1, msg: 'user created successfully', data: {name, _id}}
    }catch(err){
        const errMsg = `${(Object.keys(err.keyValue) || [])[0]} Already Taken`;
        return {status: 0, msg: errMsg}
    }
}
const loginUser = async (userData)=>{    
    const data = await UserModel.findOne({name:userData.userNameEmail}) || await UserModel.findOne({email:userData.userNameEmail});
    if(data && data?.password === userData.password){
        const {name, _id} = data;
        return {status:1, msg: 'Logged in SuccessFully', data: {name, _id}} 
    }
    return {status:0, msg: 'Invalid Credentials'}
}
const addToCart = async (prodData)=>{    
    const {userId='', productId, name, price} = prodData
    await UserModel.updateOne(
        { _id: userId }, 
        { $push: { cart: {productId, name, price} } }
    );
    const data = await UserModel.findById(userId);
    return data?.cart;
}
const addToBuy = async (prodData)=>{   
    const { userId, productId, name} = prodData
    await UserModel.updateOne(
        { _id: userId }, 
        { $push: { buy: {productId, name} } }
    );
    return removeFromCart(prodData).then(async res=>{
        const data = await UserModel.findById(userId);
        const {productId, _id}= prodData;
        return {status: 1, msg: 'Purchased successfully', data: {productId, _id}, cart: data?.cart};
    })
}

const removeFromCart = async (prodData)=>{
    const {userId, productId} = prodData
    await UserModel.updateMany(
        { _id: userId }, 
        { $pull: { cart: {productId} }}, { safe: true, multi:true }
    );
    const data = await UserModel.findById(userId);
    return data?.cart;
}

const searchUser = async (_id)=>{
    return await UserModel.findOne({_id});
}


module.exports = {showAllUsers, createUser, loginUser, addToCart, removeFromCart, searchUser, addToBuy}

//add data according to json file
// const proddata = require('./data/myntra_fashion_products_free_dataset.json')
// proddata.forEach((data)=>{
//     const images = data.images.split('~')
//     const ProdDetails =new UserModel({
//         name: data.name,
//         price: data.price,
//         items: 10,
//         brand: data.brand,
//         reviews: [],
//         rating: 4.0,
//         description: data.description,
//         images,
//     })
//     ProdDetails.save((err, doc) => { err && console.log(data)});
// })

// const deleteAll = async ()=>{
//     const data = await UserModel.deleteMany({})
//     return data
// }
// console.log(deleteAll())
// const adminID = '63273858f5bd6c4c38839ca4'

// const removeUpdates = async ()=>{
//     const prevData = await UserModel.findById(adminID)
//     // console.log('res', res)
//     prevData.buy=[];
//     const data = await UserModel.updateOne({_id: adminID},{$set:prevData})
//     console.log('data', prevData)
//         // CategoryModel.updateOne({_id: data._id},{$set:data})
// }
// removeUpdates()
