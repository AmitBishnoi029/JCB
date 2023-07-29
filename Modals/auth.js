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
    address:{
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
    },
    role:{
        type:Boolean,
        default:0
    },

},{timestamps:true});


export default mongoose.model("auth",authSchema)