const mongoose = require("mongoose");
require('./config');

const SectionSchema = new mongoose.Schema({
    name: String,
    body: Array
});
const SectionModal =  mongoose.model.products|| mongoose.model('products', SectionSchema);

const show = async ({key})=>{
    const data = await SectionModal.find({
        '$or':[{name:{$regex: key}}]
    })
    return data
}

const showAll = async ({key})=>{
    const data = await SectionModal.find(key)
    return data
}

const addProduct = async(data)=>{
    const ProdDetails =new SectionModal(data)
    let  errMsg  = ''
    ProdDetails.save((err, doc) => {errMsg = err || ''  });
    return {status: (errMsg ? 0 : 1)};
}

const editProduct = async(data)=>{
    await SectionModal.updateOne({_id:data._id},{$set:data})
    return {status: 1};
};
const removeProduct = async(data)=>{
    await SectionModal.deleteOne(data);
    return {status: 1};
};

module.exports = {show,showAll,showIndex, showPage, addProduct,editProduct,removeProduct}

// const fs = require('fs');
// const Brands = {}
// const categoryMaker = async({key}={})=>{
//     const data = await showAll({});
//     data.forEach(data=>{
//         const tempArr = data.name.split(' ');
//         tempArr.forEach(ns=> Brands[ns] = Brands[ns]?  Brands[ns]+1 : 1 )
//     })
//     console.log('Brands', Brands)
//     const res = Object.keys(Brands)
//     .sort(function(a, b){
//         // console.log('Brands[a]', Brands[a])
//         return Brands[b] - Brands[a]})
//     .reduce((accumulator, key) => {
//         accumulator[key] = Brands[key];
//         return accumulator;
//     }, {});
//     console.log('res', res)
//         fs.writeFileSync('backend/data/categoryHash.json', JSON.stringify(res, null, 2) , 'utf-8');
// }
// categoryMaker();
//add data according to json file
// const proddata = require('../data/')
// const proddata = require('../data/myntra_fashion_products_free_dataset.json')
// proddata.forEach((data)=>{
//     const images = data.images.split('~')
//     const ProdDetails =new SectionModal({
//         name: data.name,
//         price: data.price,
//         items: 10,
//         brand: data.brand,
//         rating: 4.0,
//         description: data.description,
//         images,
//     })
//     ProdDetails.save((err, doc) => { err && console.log(data)});
// })

// const deleteAll = async ()=>{
//     const data = await SectionModal.deleteMany({})
//     console.log(data)
//     return data
// }
// console.log(deleteAll())