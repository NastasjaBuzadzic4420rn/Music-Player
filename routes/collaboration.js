const express = require("express");
const { sequelize, Collaborations } = require("../models");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const route = express.Router();
const Joi = require('joi');

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

function valdateInput(input){
    const JoiSchema = Joi.object({
        name: Joi.string()
                .min(1)
                .max(30)
                .required()
    });
    return JoiSchema.validate(input);
}

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json( (err) => { msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get("/collaborations", async (req, res) => {
    try{
        const collaborations = await Collaborations.findAll();
        return res.json(collaborations);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/collaborations", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"  && role != "singer" && role != "podcaster"){
        return res.sendStatus(403);
    }
    const data = {
        name : req.body.name
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let newCollaboration = await Collaborations.create(req.body);
        res.send(newCollaboration);
    }
   
});

route.put("/collaborations/change/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"  && role != "singer" && role != "podcaster"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            name : req.body.name
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let collaboration = await Collaborations.findByPk( req.params.id );
        
        collaboration.name = req.body.name;
        await collaboration.save();
        res.send(collaboration);
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/collaborations/delete/:id", async (req,res) => {
    const {role} = req.user;
    if(role != "admin"  && role != "singer" && role != "podcaster"){
        return res.sendStatus(403);
    } 
    let collaboration = await Collaborations.findByPk( req.params.id );
    await collaboration.destroy();
    res.send(collaboration);
});