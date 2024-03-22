const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let productSchema = new Schema ({
    product :{type: String , required : true},
    cost :{type:number,required:true},
    description: {type:String, required:true},
    quantity:{type:number,required:true}
},
{
    collection:"products",
    timestamps:true
})

module.exports=mongoose.model('Product',productSchema);