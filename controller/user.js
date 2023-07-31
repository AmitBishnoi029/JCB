import Auth from "../Modals/auth.js"
import User from "../Modals/user.js"
import Dash from "../Modals/dashboard.js"

export const BookOnlyJcb = async(req,resp)=>{
    try {
        const {id,vehicle,payment,address} = req.body;

        const history = new Object()
        let currentDate = new Date()
        history.date = currentDate
        history.address = address
        history.vehicle = vehicle
        history.payment = payment
       
        const me = await Auth.findById(id);
        history.name = me.name
        
        me.History.push(history)
        await me.save()
        resp.status(200).send({success:true,message:"Jcb Book Successfuly"})
        
    } catch (error) {
        console.log("Error in BookOnlyJcb",error);
        resp.status(401).send({success:false,message:error.message})
    }
}
export const BookOnlyTrolly = async(req,resp)=>{
    try {
        const {id,vehicle,payment,address} = req.body;

        const me = await Auth.findById(id)

        const history = new Object()
        let currentDate = new Date()

        history.name = me.name
        history.date = currentDate
        history.address = address
        history.vehicle = vehicle
        history.payment = payment
        
        
        const user = await new User({name:me.name,phone:me.contact,address})
        me.History.push(history)
        await me.save()
        await user.save()
        resp.status(200).send({success:true,message:"Book trolly Successfuly"})
    } catch (error) {
     console.log("Error in BookOnlyTrolly",error);
     resp.status(401).send({success:false,message:error.message})
    }
}
export const BookBoth = async(req,resp)=>{
    try {
        const {id,vehicle,payment,address} = req.body;
    
        const me = await Auth.findById(id)

        const history = new Object()
        let currentDate = new Date()
        
        history.date = currentDate
        history.address = address
        history.vehicle = vehicle
        history.payment = payment
        history.name = me.name
        
        
        const user = await new User({name:me.name,phone:me.contact,address})
        me.History.push(history)
        await me.save()
        await user.save()
        resp.status(200).send({success:true,message:"Jcb and trolly Book Successfuly"})
    } catch (error) {
     console.log("Error in BookBoth",error);
     resp.status(401).send({success:false,message:error.message})
    }
}

export const getHistory = async(req,resp) =>{
    try {
        const {History} = await Auth.findById(req.params.id);
        resp.status(201).send({success:true,History})

    } catch (error) {
        console.log("Error in BookBoth",error);
        resp.status(401).send({success:false,message:error.message}) 
    }
}
export const getDashboard = async(req,resp) =>{
    try {
        const data = await Dash.findOne({});
        resp.status(200).send({success:true,data})

    } catch (error) {
        console.log("Error in getDashboard",error);
        resp.status(401).send({success:false,message:error.message}) 
    }
}
export const OnlyJcb_deshBoard = async(req,resp) =>{
    try {
        const {jcb_price,jcb_distance} = req.body
        const existItem = await Dash.find({})
        if(!existItem[0]){
            const item = new Dash({JCB_PRIZE:jcb_price ,DISTANCE:jcb_distance})
            const data = await item.save()
            resp.status(200).send({success:true,data,message:"Data Saved"});
          } else {
            const item = await Dash.findOne({})
            item.JCB_PRIZE=jcb_price
            item.DISTANCE=jcb_distance
            const data = await item.save()
            resp.status(200).send({success:true,data,message:"Data Saved"});
          }

    } catch (error) {
        console.log("Error in OnlyJcb_deshBoard",error);
        resp.status(401).send({success:false,message:error.message}) 
    }
}
export const OnlyTrolly_deshboard = async(req,resp) =>{
    try {
        const {trolly_price,trolly_distance} = req.body
        const existItem = await Dash.find({})
        if(!existItem[0]){
        const item = new Dash({DISTANCE:trolly_distance, TROLLY_PRIZE:trolly_price})
        const data = await item.save()
        resp.status(200).send({success:true,data,message:"Data Saved"});
        } else {
            const item = await Dash.findOne({})
            item.DISTANCE=trolly_distance
            item.TROLLY_PRIZE= trolly_price
            const data = await item.save()
        resp.status(200).send({success:true,data,message:"Data Saved"})
        }

    } catch (error) {
        console.log("Error in OnlyTrolly_deshBoard",error);
        resp.status(401).send({success:false,message:error.message}) 
    }
}
export const Combined_deshboard = async(req,resp) =>{
    try {
        const {jcb_price,trolly_price,jcb_distance,trolly_distance} = req.body
        const existItem = await Dash.find({})
        if(!existItem[0]){
        const obj = new Object()
        obj.BOTH_PRIZE.JCB_PRIZE = jcb_price
        obj.BOTH_PRIZE.TROLLY_PRIZE=trolly_price

        obj.BOTH_EXTRA_PRIZE.JCB_EXTRA_PRIZE=jcb_distance
        obj.BOTH_EXTRA_PRIZE.TROLLY_EXTRA_PRIZE=trolly_distance

        const item = new Dash(obj)
        const data = await item.save()
        resp.status(200).send({success:true,data,message:"Data Saved"});
        } else {
            const item = await Dash.findOne({})
            item.BOTH_PRIZE.JCB_PRIZE = jcb_price
            item.BOTH_PRIZE.TROLLY_PRIZE=trolly_price
    
            item.BOTH_EXTRA_PRIZE.JCB_EXTRA_PRIZE=jcb_distance
            item.BOTH_EXTRA_PRIZE.TROLLY_EXTRA_PRIZE=trolly_distance
    
            const data = await item.save()
            resp.status(200).send({success:true,data,message:"Data Saved"})
        }

    } catch (error) {
        console.log("Error in Combined_deshBoard",error);
        resp.status(401).send({success:false,message:error.message})
    }
}