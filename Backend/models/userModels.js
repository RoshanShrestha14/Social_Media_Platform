const mongoose = require('mongoose');
const {model, Schema}=require('mongoose');

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    profilePicture:{
        type:String,
        default:"defaultProfile.png",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }, 
});

const userModel=model("User",userSchema);

module.exports=userModel;