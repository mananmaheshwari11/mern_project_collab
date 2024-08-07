import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone_no:{
        type:Number,
        unique:true,
        length:10
    },
    role:{
        type:Number,
        default:0,
    }
},
{timestamps:true});

export default mongoose.model('userModel',userModel);   