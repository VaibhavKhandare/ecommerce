const mongoose = require("mongoose");
require('../config');


const FilterSchema = new mongoose.Schema({
    checkBoxesData:Object,
    priceRange:Array
});
const FilterModel = mongoose.model('filter', FilterSchema);

const showFilter = async ()=>{
    const data = await FilterModel.findOne({});
    return data
}

module.exports = {showFilter}

// add data according to json file


// const color = {
//     "White": 28,
// "Black": 46,
// "Blue": 89,
// "Brown": 18,
// "Red": 18,
// "Beige": 16,
// "Gold-Toned": 16,
// "Green": 15,
// "Pink": 14,
// "Floral": 12,
// "Yellow": 11,
// "Multicoloured": 8,
// "Maroon": 11,
// "Grey": 27,
// "Navy": 29,
// }
// const category = {
//     "Men": 100,
//     "Fit": 86,
//     "Women": 82,
//     "Printed": 66,
//     "Slim": 42,
//     "Shirt": 40,
//     "Casual": 38,
//     "Regular": 33,
//     "T-shirt": 29,
//     "Jeans": 22,
//     "Padded": 21,
//     "Bra": 21,
//     "Checked": 20,
//     "Look": 19,
//     "Boys": 18,
//     "Stretchable": 17,
//     "Underwired": 17,
//     "Set": 16,
//     "Table": 16,
//     "Skinny": 15,
//     "Geometric": 15,
//     "Neck": 15,
//     "Round": 14,
//     "Trousers": 13,
//     "Mid-Rise": 13,
//     "Leather": 13,
//     "Girls": 13,
//     "Everyday": 12,
//     "Shorts": 11,
//     "Eau": 11,
//     "Cufflinks": 11,
//     "Top": 11,
//     "Dress": 10,
//     "Unisex": 9,
//     "Jacket": 9,
//     "Placemats": 9,
//     "Formal": 9,
//     "Trolley": 8,
//     "Bag": 8,
//     "Bedsheet": 8,
//     "Pillow": 8,
//     "Covers": 8,
//     "Kurta": 8,
//     "Collar": 8,
//     "Handcrafted": 8,
//     "Striped": 8,
//     "Open": 8
// }
//   const brand = {
//         "Parx": 34,
//         "PARFAIT": 23,
//         "Gini and Jony": 19,
//         "SEJ by Nisha Gupta": 15,
//         "SPYKAR": 14,
//         "ID": 13,
//         "JEWEL JUNCTION": 11,
//         "DKNY": 9,
//         "Lady Lyka": 9,
//         "Story@home": 8,
//         "Homesake": 7,
//         "HIGHLANDER": 7,
//         "her by invictus": 7,
//         "Campus Sutra": 7,
//         "Bvlgari": 7,
//         "Raymond": 6,
//         "AccessHer": 6,
//         "Urban Dog": 6,
//         "Tokyo Talkies": 5,
//         "Difference of Opinion": 5,
//         "MIAH Decor": 5,
//         "Lakme": 5,
//     "Sera": 4,
//     "ahilya": 4,
//     "Palm Tree": 4,
//     "Michael Kors": 3,
//     "Soie": 3,
//     "BuckleUp": 3,
//     "EthnoVogue": 2,
//     "Vishudh": 2,
//     "VASTRAMAY": 2,
//     "FIDO DIDO": 2,
//     "Park Avenue": 2,
//     "Kazo": 2,
//     "WITH": 2,
//     "ZUSH": 2,
//     "U.S. Polo Assn. Kids": 2,
//     "Carrera": 2,
//     "HARBORNBAY": 2,
//     "Aj DEZInES": 2,
//     "Being Human": 1,
//     "Alcis": 1,
//     "SHOWOFF": 1,
//     "Police": 1,
//     "YAK YAK": 1,
//     "Kenneth Cole": 1,
//     "ANNA SUI": 1,
//     "Lara Karen": 1,
//     "Peter England": 1,
//     "AIGNER": 1,
//     "Roadster": 1,
//     "U.S. Polo Assn. Denim Co.": 1,
//     "Sweet Dreams": 1,
//     "Stylo Bug": 1,
//     "Qraa Men": 1,
//     "GAS": 1,
//     "JBN Creation": 1,
//     "DressBerry": 1,
//     "ColorPlus": 1,
//     "Allen Solly Woman": 1,
//     "Arrow": 1,
//     "DAVID BECKHAM": 1,
//     "MANGO": 1,
//     "ROMEE": 1,
//     "TAYHAA": 1,
//     "Ishin": 1,
//     "Shoe Couture": 1,
//     "Keds": 1,
//     "Rozia": 1,
//     "Monte Carlo": 1,
//     "even": 1,
//     "ether": 1,
//     "Crimsoune Club": 1,
//     "Russell Athletic": 1,
//     "MIMOSA": 1
// }
// const updateData = async ()=>{
//         FilterModel.deleteMany({}).then(()=>{
//                 const ProdDetails =new FilterModel({
//                     checkBoxesData:{brand,color,category,},
//                     priceRange:[0,20000]
//                 })
//                 ProdDetails.save((err, doc) => { err && console.log(err)});
//         });     return 'updated'}
// console.log(updateData())