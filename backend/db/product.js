const mongoose = require("mongoose");
require('./config');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    items: Number,
    brand: String,
    description: String,
    images: Array,
    rating: Number,
});
const ProductModel =  mongoose.model.products|| mongoose.model('products', ProductSchema);

const show = async ({key})=>{
    const data = await ProductModel.find({
        '$or':[{name:{$regex: key}}]
    })
    return data
}

const showAll = async ({key})=>{
    const data = await ProductModel.find(key)
    return data
}
const showIndex = async (id)=>{
    const data = await ProductModel.findById(id)
    return data
}

const RegexMaker = (key={}) => {
    const Regex = [];
    const CategoryRegex = []
    const brandRegex = []
    const colorRegex = []
    let isFilter = false;
    if(key.search){
        isFilter= true;
        Regex.push({$or: [{name:{$regex:new RegExp(key.search, "i")}},{brand:{$regex:new RegExp(key.search, "i")}}]})
    }
    if(key.price){
        const [minPrice, maxPrice] = key.price.split(',');
        isFilter= true;
        Regex.push({$or: [{price: { $lte: maxPrice || 1000000000, $gte: minPrice || 0 }}]})
    }
    if(key.category){
        isFilter= true;
        const categoryArray = key.category.split(',');
        categoryArray.forEach((val)=>{
            CategoryRegex.push(
                {name:{$regex:new RegExp(val, "i")}}
            )
        })
        Regex.push({$or: CategoryRegex})
    }
    if(key.brand){
        isFilter= true;
        const brandArray = key.brand.split(',');
        brandArray.forEach((val)=>{
            brandRegex.push(
                {brand:{$regex:new RegExp(val, "i")}}
            )
        })
        Regex.push({$or: brandRegex})
    }
    if(key.color){
        isFilter= true;
        const colorArray = key.color.split(',');
        colorArray.forEach((val)=>{
            colorRegex.push(
                {name:{$regex:new RegExp(val, "i")}}
            )
        })
        Regex.push({$or: colorRegex})
    }
    return isFilter ? { $and: Regex } : {};
}

const PageSize = 20

const showPage = async ({key},pageNo=1)=>{
    const regex = RegexMaker(key)
    let data = await ProductModel.find(regex).limit(PageSize).skip(PageSize * (pageNo-1))
    const totalPage =  await ProductModel.count(regex)
    const pageData = {data: data, pageNo: parseInt(pageNo || 1), totalPage: totalPage}
    return pageData
}

const addProduct = async(data)=>{
    const ProdDetails =new ProductModel(data)
    let  errMsg  = ''
    ProdDetails.save((err, doc) => {errMsg = err || ''  });
    return {status: (errMsg ? 0 : 1)};
}

const editProduct = async(data)=>{
    await ProductModel.updateOne({_id:data._id},{$set:data})
    return {status: 1};
};
const removeProduct = async(data)=>{
    await ProductModel.deleteOne(data);
    return {status: 1};
};

const reduceItemCount = async(data)=>{
    const prevData = await ProductModel.findById(data._id)
    prevData.items -= 1
    await ProductModel.updateOne({_id:data._id},{$set:prevData})
    return {status: 1};
};

module.exports = {show,showAll,showIndex, showPage, addProduct,editProduct,removeProduct, reduceItemCount}

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
//     const ProdDetails =new ProductModel({
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
//     const data = await ProductModel.deleteMany({})
//     console.log(data)
//     return data
// }
// console.log(deleteAll())