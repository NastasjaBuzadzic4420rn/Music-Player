const express = require("express");
const { sequelize, Listeners } = require("../models");
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
                .required(),
        password: Joi.string()
                .min(4)
                .max(30)
                .required(),
        age: Joi.number()
                .integer()
                .min(14)
                .max(120),
        country: Joi.string()
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

route.get("/listeners", async (req, res) => {
    try{
        const listeners = await Listeners.findAll();
        return res.json(listeners);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/listeners", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    const data = {
        name : req.body.name,
        password : req.body.password,
        age : req.body.age,
        country : req.body.country
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let listener = await Listeners.create(req.body);
        res.send(listener);
    }
    
});

route.put("/listeners/change/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            name : req.body.name,
            password : req.body.password,
            age : req.body.age,
            country : req.body.country
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let listener = await Listeners.findByPk( req.params.id );
            listener.name = req.body.name;
            listener.password = req.body.password;
            listener.age = req.body.age;
            listener.country = req.body.country;
            await listener.save();
            res.send(listener);
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/listeners/delete/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    let data = await Listeners.findByPk( req.params.id );
    await data.destroy();
    res.send(data);
});