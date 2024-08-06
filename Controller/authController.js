import userModel from "../models/userModel.js";
import { hashedPassword } from "../Helper/authHelper.js";

//User Registration
export const registerUser=async(req,res)=>{               //request,response
    try{
    const {name,email,password,cfmpwd,phone_no}=req.fields
    if(!name){
        return res.status(404).send({message:"Name is required"});
    }
    if(!email){
        return res.status(404).send({message:"E-mail is required"});
    }
    if(!password){
        return res.status(404).send({message:"Password is required"});
    }
    if(!cfmpwd){
        return res.status(404).send({message:"Confirm Password is required"});
    }
    if(!phone_no){
        return res.status(404).send({message:"Phone Number is required"});
    }
    if(phone_no.length!=10){
        return res.status(400).send({message:"Phone Number is of 10 Numbers"});
    }
    const same_user=await userModel.findOne({email})
    if(same_user){
        return res.status(404).send({message:"E-mail already registered"});
    }
    if(password!=cfmpwd){
        return res.status(400).send({message:"Password & Confirm Password should be same"})
    }
    const hashedpassword=hashedPassword(password)
    const user=await new userModel({name:name,email:email,password:hashedpassword,phone_no:phone_no}).save()
    return res.status(201).send({
        success:true,
        message:"User Registered Successfully",
        user
    })
}
catch(error){
    return res.status(400).send({
        success:false,
        message:"Error in user Sign-up",
        error
    })
}
}
export const logIn=async(req,res)=>{
    
}