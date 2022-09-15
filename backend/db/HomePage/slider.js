const mongoose = require("mongoose");
require('../config');

const SliderSchema = new mongoose.Schema({
    title: String,
    discount: String,
    imgUrl: String,
    link: String,
});
const SliderModel = mongoose.model('slider', SliderSchema);

const showSliders = async ()=>{
    const data = await SliderModel.find({});
    return data
}

module.exports = {showSliders}

// add data according to json file
const sliderData = [
    {
    title: 'Casual Wear', 
    discount: 30,  
    imgUrl:"https://images.unsplash.com/photo-1589465885857-44edb59bbff2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    link:'product?search=top',
    },
    {
    title: 'Summer Wear', discount: 10,  
    imgUrl:"https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
    link:'product?brand=Sera',},
    {
    title: 'Sport Wear', discount: 45,  
    imgUrl:"https://images.pexels.com/photos/6975472/pexels-photo-6975472.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link:'product?brand=SPYKAR'
    },
    {
      title: 'Party Wear', discount: 20,  
      imgUrl:"https://i.ibb.co/DG69bQ4/2.png",
      link:'product?search=dress'
    },
];


// const UpdateAll = async ()=>{
//         SliderModel.deleteMany({}).then(()=>{
//             sliderData.forEach((data)=>{
//                 const ProdDetails =new SliderModel({
//                     title: data.title,
//                 discount: data.discount,
//                 imgUrl: data.imgUrl,
//                 link: data.link,
//                 })
//                 ProdDetails.save((err, doc) => { err && console.log(data)});
//             })});     return 'updated'}
// console.log(UpdateAll())