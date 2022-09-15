const mongoose = require("mongoose");
require('./config');

const BigDataSchema = new mongoose.Schema({

    // name: String,
    // price: Number,
    // items: Number,
    // brand: String,
    // description: String,
    // images: Array,
    // reviews: Array,
    // rating: Number,


    link: String,
    items: Number,
    // size: String,
    // variant_sku: String,
    brand: String,
    care_instructions: String,
    dominant_material: String,
    name: String,
    actual_color: String,
    // dominant_color: String,
    product_type: String,
    images: String,
    // body: String,
    description: String,
    // size_fit: String,
    complete_the_look: String,
    type: String,
    price: String,
    // variant_compare_at_price: String,
    ideal_for: String,
    // is_in_stock: String,
    inventory: String,
    specifications: String,
    reviews: Array,
    rating: Number,

});
const BigProductModel =  mongoose.model.bigProducts|| mongoose.model('bigProducts', BigDataSchema);

const show = async ({key})=>{
    const data = await BigProductModel.find({
        '$or':[{name:{$regex: key}}]
    })
    return data
}

const showAll = async ({key})=>{
    const data = await BigProductModel.find(key)
    return data
}
const showIndex = async (id)=>{
    const data = await BigProductModel.findById(id)
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
        Regex.push({$or: [{name:{$regex:new RegExp(key.search,"i")}},{brand:{$regex:new RegExp(key.search, "i")}}]})
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
    let data = await BigProductModel.find(regex).limit(PageSize).skip(PageSize * (pageNo-1))
    const totalPage =  await BigProductModel.count(regex)
    const pageData = {data: data, pageNo: parseInt(pageNo || 1), totalPage: totalPage}
    return pageData
}


module.exports = {show,showAll,showIndex, showPage}

const fs = require('fs'); 
const {parse} = require('csv-parse');

// var data={};
console.log('running')
fs.createReadStream('backend/data/myntrabigdata.csv')
    .pipe(parse({relax: true,delimiter: ','}, ))
    .on('data', function(csvrow) {
        // const str = csvrow.split(';');
        // console.log('typeof csvrow', typeof csvrow, csvrow[0])
        console.log('csvrow', csvrow)
        const [niq_id,crawl_timestamp,product_id,link,size,variant_sku,brand,care_instructions,dominant_material,title,actual_color,dominant_color,product_type,images,body,product_details,size_fit,complete_the_look,type,variant_price,variant_compare_at_price,ideal_for,is_in_stock,inventory,specifications] = csvrow;
        const dimages = images.split('|')
        
        const ProdDetails =new BigProductModel({
            link: link,
            items: 10,
            // size: size,
            // variant_sku: variant_sku,
            brand: brand,
            care_instructions: care_instructions,
            dominant_material: dominant_material,
            name: title,
            actual_color: title,
            // dominant_color: dominant_color,
            product_type: product_type,
            images: dimages,
            // body: body,
            description: product_details,
            // size_fit: size_fit,
            complete_the_look: complete_the_look,
            type: type,
            price: variant_price,
            // variant_compare_at_price: String,
            ideal_for: ideal_for,
            // is_in_stock: is_in_stock,
            // inventory: String,
            specifications: specifications || inventory,
            reviews: [],
            rating: 4,
            })
         ProdDetails.save((err, doc) => { err && console.log(err)});
    })
    .on('end',function() {
      console.log('data added');
    });


//add data according to json file
// const proddata = require('./data/myntrabigdata.csv')
// proddata.forEach((data)=>{
//     const images = data.images.split('~')
//     const ProdDetails =new BigProductModel({
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
//     const data = await BigProductModel.deleteMany({})
//     console.log(data)
//     return data
// }
// console.log(deleteAll())