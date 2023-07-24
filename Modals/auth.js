import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    History:{
        type:Array,
        default:[]
    }
},{timestamps:true});


export default mongoose.model("auth",authSchema)