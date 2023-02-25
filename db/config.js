const dotenv = require("dotenv")
const mongoose = require('mongoose');

dotenv.config({path: '../config.env'});

const dataBaseLocation = process.env.DATABASE

mongoose.connect(dataBaseLocation,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// mongoose.connect('mongodb://localhost:27017/ecommerece');

/* command to run mongosh "mongodb+srv://cluster0.ngcs0mj.mongodb.net/myFirstDatabase" --apiVersion 1 --username vaibhavkhandare 
shell
 */