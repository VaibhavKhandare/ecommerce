const mongoose = require("mongoose");
require('./config');

const BuySchema = new mongoose.Schema({
    productId: String,
    userId: String,
    status: Number,
});
const BuyModel = mongoose.model('buys', BuySchema);

const showAllBuys = async ()=>{
    const data = await BuyModel.find({});
    return data
}

const createBuy = async (productData)=>{
    const data = await BuyModel.create(productData);
    const {productId, _id} = data;
    return {status: 1, msg: 'Purchased successfully', data: {productId, _id}}    
}

module.exports = {showAllBuys, createBuy}


// const deleteAll = async ()=>{
//     const data = await BuyModel.deleteMany({})
//     return data
// }
// console.log(deleteAll())