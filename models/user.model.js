const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator")

let addressSchema = new Schema ({
    area:{type:String},
    road:{type:String}
},{_id:false})

let phoneSchema = new Schema({
    type :{type : String},
    number:{type:String}
},{_id:false})

let productSchema = new Schema ({
    product :{type:String},
    cost : {type:Number},
    quantity:{type:Number},
    date : {type:Date, default : Date.now}
})

let userSchema = new mongoose.Schema ({
    username :{
        type:String,
        require:[true,'username is required field'],
        maxLength:20,
        unique:true,
        trim:true, 
        lowercase:true, 
    },
    password : {
        type: String,
        required : [true, "the field is required"],
        minLength:6
    },
    name : {
        type : String
    },
    surname : {type : String},
    email : {
        type: String,
        required:[true,'email is required'],
        unique:true,
        trim:true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"email address is not valid"]
    },
    address : addressSchema,
    phone : {type:[phoneSchema],null: true},
    products:{type :[productSchema],null:true}
},{
    collection :"users",
    timestamps:true

})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema)