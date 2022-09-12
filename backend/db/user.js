const mongoose = require("mongoose");
require('./config');

const UserSchema = new mongoose.Schema({
    name: {type: String,unique: true},
    email: {type: String,unique: true},
    password: String,
});
const UserModel = mongoose.model('users', UserSchema);

const showAllUsers = async ()=>{
    const data = await UserModel.find({});
    return data
}
const createUser = async (userData)=>{
    try{
        await UserModel.create(userData);
        return {status: 1, msg: 'user created successfully'}
    }catch(err){
        const errMsg = `${(Object.keys(err.keyValue) || [])[0]} Already Taken`;
        return {status: 0, msg: errMsg}
    }
}
const loginUser = async (userData)=>{
    
    const data = await UserModel.find({name:userData.userNameEmail}) || [];
    if(data.length>0 && data[0]?.password === userData.password){
        return {status:1, msg: 'Logged in SuccessFully'} 
    }
    return {status:0, msg: 'Invalid Credentials'}
}

module.exports = {showAllUsers, createUser, loginUser}

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
//     console.log(data)
//     return data
// }
// console.log(deleteAll())