import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()
export const hashedPassword=async(string)=>{
    try{
        const salt_value=10
        const hashed= await bcrypt.hash(string,salt_value)
        return hashed;
    }
    catch(error){
        console.log("error in password encryption");
    }
}

export const checkPassword=async(password1,password2)=>{
    try {
        const value= await bcrypt.compare(password1,password2)
        return value;
    } catch (error) {
        console.log("Error in password decryption")
    }
}