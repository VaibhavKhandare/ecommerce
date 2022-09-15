const mongoose = require("mongoose");
require('../config');

const CategorySchema = new mongoose.Schema({
    title: String,
    imgUrl: String,
    link: String,
});
const CategoryModel = mongoose.model('category', CategorySchema);

const showcategory = async ()=>{
    const data = await CategoryModel.find({});
    return data
}

module.exports = {showcategory}

// add data according to json file
// const tempData = [
//     {
//         imgUrl: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//         title: "SHIRT STYLE!",
//         link:'',
//       },
//       {
//         imgUrl: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//         title: "LOUNGEWEAR LOVE",
//         link:'',
//       },
//       {
//         imgUrl: "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         title: "LIGHT JACKETS",
//         link:'',
//       },
// ];
// const updateData = async ()=>{
//         CategoryModel.deleteMany({}).then(()=>{
//             tempData.forEach((data)=>{
//                 const ProdDetails =new CategoryModel({
//                     title: data.title,
//                     imgUrl: data.imgUrl,
//                     link: data.link,
//                 })
//                 ProdDetails.save((err, doc) => { err && console.log(data)});
//             })});     return 'updated'}
// console.log(updateData())