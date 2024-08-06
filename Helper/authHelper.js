import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()
export const hashedPassword=async(string)=>{
    try{
        const salt_value=process.env.SALT;
        const hashed= await bcrypt.hash(string,salt_value)
        return hashed;
    }
    catch(error){
        console.log("error in password encryption");
    }
}