const mongoose = require('mongoose');

// console.log('runned', runned)
const dbAdd ='mongodb+srv://vaibhavkhandare:vaibhav931@cluster0.ngcs0mj.mongodb.net/ecommerce?retryWrites=true&w=majority'
mongoose.connect(dbAdd)
// mongoose.connect('mongodb://localhost:27017/ecommerece');

/* command to run mongosh "mongodb+srv://cluster0.ngcs0mj.mongodb.net/myFirstDatabase" --apiVersion 1 --username vaibhavkhandare 
shell
 */