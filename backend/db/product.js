const mongoose = require("mongoose");
require('./config');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    items: Number,
    brand: String,
    description: String,
    images: Array,
    reviews: Array,
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


module.exports = {show,showAll,showIndex, showPage}

//add data according to json file
// const proddata = require('./data/myntra_fashion_products_free_dataset.json')
// proddata.forEach((data)=>{
//     const images = data.images.split('~')
//     const ProdDetails =new ProductModel({
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
//     const data = await ProductModel.deleteMany({})
//     console.log(data)
//     return data
// }
// console.log(deleteAll())