import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }
},{timestamps:true});


export default mongoose.model("users",userSchema)