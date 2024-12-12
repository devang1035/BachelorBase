const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ownerId:{
        type:mongoose.Schema.ObjectId , 
        ref:'User'
    },
    image:{
        type:[String] //array of image url.
    },
    aminites:{ 
        type:[String]  //wifi,ac etc..
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


});

module.exports= mongoose.model('Listing', listingSchema);