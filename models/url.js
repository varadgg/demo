const mongoose = require("mongoose");


const urlSchema = new mongoose.Schema({
    sid:{
        type :String,
        required : true,
        unidue:true,
    },
    redirectUrl:{
        type :String,
        required : true,
        
    },
    visitHistory : [{ timestamp : {type:Number} }],
},
{ timestamps:true }
);

const Url = mongoose.model("URL",urlSchema)

module.exports= Url;