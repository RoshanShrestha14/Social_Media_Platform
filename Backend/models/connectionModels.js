const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const connectionSchema = new Schema({

    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    connectionId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    status:{
        type:boolean,
        Default:null,       
    },


});

const connectionModel = model("Connection", connectionSchema);

module.exports = connectionModel;
