import userModel from "../models/userModel.js";
import { checkPassword, hashedPassword } from "../Helper/authHelper.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
//User Registration
export const registerUser=async(req,res)=>{               //request,response
    try{
    const {name,email,password,cfmpwd,phone_no}=req.body
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
    const hashedpassword=await hashedPassword(password)
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
    try {
        const {email,password} = req.body;
        if(email==null){
            return res.status(400).send({message:"Enter correct email!"});
        }
        if(!password){
            return res.status(400).send({message:"Password is required!"});
        }
        const user = await userModel.findOne({email});
        if(await checkPassword(password,user.password)){
            const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
            return res.status(201).send({
                success:true,
                message:"User Logged-In Successfully",
                token,
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    phone_no:user.phone_no
                }
            })
        }
        else{
            return res.status(400).send({
                message:"Invalid user email or password"
            })
        }
    } catch (error){
        return res.status(400).send({
            success:false,
            message:"Error in user Sign-in",
            error
        })
    }
}

export const getallusers=async(req,res)=>{
    try {
        const users=await userModel.find({})
        return res.status(200).send({
            success:true,
            message:"Getting all the user",
            users
        })
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in getting the user",
            error
        })
    }
}

export const updateUser=async(req,res)=>{
    try {
        const {id}=req.params
        const{name,phone_no}=req.body
        const user=await userModel.findByIdAndUpdate(id,{name:name,phone_no:phone_no},{new:true});
        return res.status(200).send({
            message:"Updated successfully",
            success:false,
            user
        })
        
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in updating the user",
            error
        })
    }
}