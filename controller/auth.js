import Auth from "../Modals/auth.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async(req,resp)=>{
   try {
    
    const {name , email , password , contact} = req.body
    console.log("contact : ",contact);
    
    const existUser = await Auth.findOne({email})
    // console.log(existUser);
    if(existUser){
        resp.status(201).send({success:false,message:"Email already exist"})
    } else {

        const salt = 10;
        // const user = new Auth({name,email,contact});
        const hashedPassword = await bcrypt.hash(password,salt);
        // const newUserawait = user.save()
        const user = await new Auth({name,email,contact,password:hashedPassword}).save();
        
        // /*CREATING JSON TOKEN */
        const key = "amitbishnoi123"
        const token = await jwt.sign({id:user._id},key,{expiresIn:"7d"})
        delete user.password 
        resp.status(200).send({success:true,role:user.role,user,token,id:user._id,message:"Registered successfuly"})
    }

   } catch (error) {
    console.log("Error occures in Register",error);
    resp.status(400).send({success:false,message:"Something went wrong"})
   }
}
export const login = async(req,resp)=>{
    try {
        const {email,contact ,password} = req.body;
        const user = await Auth.findOne({email});
        if(user){
        const oldPassword = user.password
        const isMatch = await bcrypt.compare(password,oldPassword);
        if(isMatch){
            // /*CREATING JSON TOKEN */
            const key = "amitbishnoi123"
            const token = await jwt.sign({id:user._id},key,{expiresIn:"7d"});
            resp.status(200).send({success:true,token,role:user.role,id:user._id,message:"Login SuccessFuly"})
        } else{
            resp.status(200).send({success:false,message:"Enter valid Details"})
        }
        } else{
            resp.status(200).send({success:false,message:"User Not Registered"})
        }
    } catch (error) {
        console.log("Error occures in login",error);  
        resp.status(400).send({success:false,message:"Something went wrong"})
    }
}

export const ChangePassword = async(req,resp)=>{
    try {
        const {email,oldpassword,newpassword} = req.body
        const user = await Auth.findOne({email})
        if(user){
            const salt = 10;
            // const user = new Auth({name,email,contact});
            const hashedPassword = await bcrypt.hash(newpassword,salt);
            user.password = hashedPassword
            await user.save()
            resp.status(201).send({success:true,message:"Password Changed"})
        } else {
            resp.status(200).send({success:false,message:"User not registered"})
        }
    } catch (error) {
        console.log("Error occures in ChangePassword",error);  
        resp.status(400).send({success:false,message:"Something went wrong"})     
    }
}
