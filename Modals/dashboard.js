import mongoose from "mongoose";

const dashboardSchema = mongoose.Schema({
DISTANCE:{
    type:String,
    default:""
},
 JCB_PRIZE:{
    type:String,
    default:""
 },
 TROLLY_PRIZE:{
    type:String,
    default:""
 },
 BOTH_PRIZE:{
    JCB_PRIZE:{
    type:String,
    default:""
    },
    TROLLY_PRIZE:{
    type:String,
    default:""
    },
 },
 JCB_EXTRA_PRIZE:{
    type:String,
    default:""
 },
 TROLLY_EXTRA_PRIZE:{
    type:String,
    default:""
 },
 BOTH_EXTRA_PRIZE:{
    JCB_EXTRA_PRIZE:{
    type:String,
    default:""
    },
    TROLLY_EXTRA_PRIZE:{
    type:String,
    default:""
    }
}

},{timestamps:true});


export default mongoose.model("dashboard",dashboardSchema)