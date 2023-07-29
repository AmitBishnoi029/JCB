import mongoose from "mongoose";

const URL = process.env.DB_URL || "mongodb+srv://itsamit:amit%40123@cluster0.6zmhgsv.mongodb.net/jcb"
// console.log('URL');
export const connect = async() =>{
    try {
        await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true})
        console.log(`database connected`);
    } catch (error) {
        console.log("error while connecting database",error.message);
    }
}