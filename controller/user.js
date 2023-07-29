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

        const history = new Object()
        let currentDate = new Date()
        
        history.date = currentDate
        history.address = address
        history.vehicle = vehicle
        history.payment = payment
       
        const {name,contact} = await Auth.findById(id)
        
        const user = await new User({name,phone:contact,address})
        user.History.push(history)

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

        const history = new Object()
        let currentDate = new Date()
        
        history.date = currentDate
        history.address = address
        history.vehicle = vehicle
        history.payment = payment
       
        const {name,contact} = await Auth.findById(id)
        
        const user = await new User({name,phone:contact,address})
        user.History.push(history)

        await user.save()
        resp.status(200).send({success:true,message:"Jcb and trolly Book Successfuly"})
    } catch (error) {
     console.log("Error in BookBoth",error);
     resp.status(401).send({success:false,message:error.message})
    }
}

export const getHistory = async(req,resp) =>{
    try {
        console.log("id : ",req.params.id);
        const {History} = await Auth.findById(req.params.id);
        resp.status(201).send({success:true,History})

    } catch (error) {
        console.log("Error in BookBoth",error);
        resp.status(401).send({success:false,message:error.message}) 
    }
}
export const getDashboard = async(req,resp) =>{
    try {
        const data = await Dash.findById(req.params.id);
        resp.status(200).send({success:true,data})

    } catch (error) {
        console.log("Error in getDashboard",error);
        resp.status(401).send({success:false,message:error.message}) 
    }
}
export const OnlyJcb_deshBoard = async(req,resp) =>{
    try {
        const {jcb_price,jcb_distance} = req.body
        await Dash.findByIdAndUpdate(req.params.id,{JCB_PRIZE:jcb_price ,DISTANCE:jcb_distance})
        const data = await Dash.findById(req.params.id);
        resp.status(200).send({success:true,data,message:"Data Saved"});

    } catch (error) {
        console.log("Error in OnlyJcb_deshBoard",error);
        resp.status(401).send({success:false,message:error.message}) 
    }
}
export const OnlyTrolly_deshboard = async(req,resp) =>{
    try {
        const {trolly_price,trolly_distance} = req.body
        const item = await Dash.findByIdAndUpdate(req.params.id,{DISTANCE:trolly_distance, TROLLY_PRIZE:trolly_price})
        const data = await Dash.findById(req.params.id);
        resp.status(200).send({success:true,data,message:"Data Saved"})

    } catch (error) {
        console.log("Error in OnlyTrolly_deshBoard",error);
        resp.status(401).send({success:false,message:error.message}) 
    }
}
export const Combined_deshboard = async(req,resp) =>{
    try {
        const {jcb_price,trolly_price,jcb_distance,trolly_distance} = req.body
        const item = await Dash.findById(req.params.id)

        item.BOTH_PRIZE.JCB_PRIZE = jcb_price
        item.BOTH_PRIZE.TROLLY_PRIZE=trolly_price

        item.BOTH_EXTRA_PRIZE.JCB_EXTRA_PRIZE=jcb_distance
        item.BOTH_EXTRA_PRIZE.TROLLY_EXTRA_PRIZE=trolly_distance

        const newItem = await item.save()
        resp.status(200).send({success:true,data:newItem,message:"Data Saved"})

    } catch (error) {
        console.log("Error in Combined_deshBoard",error);
        resp.status(401).send({success:false,message:error.message})
    }
}