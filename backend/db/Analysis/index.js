const mongoose = require("mongoose");
require('../config');

const AnalysisSchema = new mongoose.Schema({
    visited:Number,
    search:Object,
    brand:Object,
    category: Object,
    color:Object,
});
const AnalyisModel = mongoose.model('analysis', AnalysisSchema);

const showAnalysis = async ()=>{
    const data = await AnalyisModel.findOne({});
    return data
}

const increaseAnalysisData = async(data)=>{
    await AnalyisModel.updateOne({_id: data._id},{$set:data})
} 

module.exports = {showAnalysis, increaseAnalysisData}

// const UpdateAll = async ()=>{
//         AnalyisModel.deleteMany({}).then(()=>{
//             const ProdDetails =new AnalyisModel({
//                 visited:0,
//                 search:{test: 0},
//                 brand:{test:0},
//                 category: {test:0},
//                 color:{test:0},
//             })
//             ProdDetails.save((err, doc) => { err && console.log(err)});
//             return 'updated'})}
// console.log(UpdateAll())


// add data according to json file
// const AnalysisData = [
//     {
//     title: 'Casual Wear', 
//     discount: 30,  
//     imgUrl:"https://images.unsplash.com/photo-1589465885857-44edb59bbff2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//     link:'search=top',
//     },
//     {
//     title: 'Summer Wear', discount: 10,  
//     imgUrl:"https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
//     link:'brand=Sera',},
//     {
//     title: 'Sport Wear', discount: 45,  
//     imgUrl:"https://images.pexels.com/photos/6975472/pexels-photo-6975472.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     link:'brand=SPYKAR'
//     },
//     {
//       title: 'Party Wear', discount: 20,  
//       imgUrl:"https://i.ibb.co/DG69bQ4/2.png",
//       link:'search=dress'
//     },
// ];


// const UpdateAll = async ()=>{
//         AnalyisModel.deleteMany({}).then(()=>{
//             AnalysisData.forEach((data)=>{
//                 const ProdDetails =new AnalyisModel({
//                     title: data.title,
//                 discount: data.discount,
//                 imgUrl: data.imgUrl,
//                 link: data.link,
//                 })
//                 ProdDetails.save((err, doc) => { err && console.log(data)});
//             })});     return 'updated'}
// console.log(UpdateAll())