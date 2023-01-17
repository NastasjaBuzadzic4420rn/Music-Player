const express = require("express");
const { sequelize, RecordLabels } = require("../models");

const route = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
const Joi = require('joi');
module.exports = route;

function valdateInput(input){
    const JoiSchema = Joi.object({

        name: Joi.string()
                .min(1)
                .max(30)
                .required(),
        dateFounded: Joi.number()
                .integer()
                .min(1)
                .max(2022),
        headquarters: Joi.string()
                .min(1)
                .max(100)
                .required(),
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

route.get("/recordLabels", async (req, res) => {
    try{
        const recordLabels = await RecordLabels.findAll();
        return res.json(recordLabels);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/recordLabels", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    const data = {
        name : req.body.name,
        dateFounded : req.body.dateFounded,
        headquarters : req.body.headquarters,
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let recordLabel = await RecordLabels.create(req.body);
        res.send(recordLabel);
    }
});

route.put("/recordLabels/change/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            name : req.body.name,
            dateFounded : req.body.dateFounded,
            headquarters : req.body.headquarters,
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let recordLabel = await RecordLabels.findByPk( req.params.id );
            recordLabel.name = req.body.name;
            recordLabel.dateFounded = req.body.dateFounded;
            recordLabel.headquarters = req.body.headquarters;
            await recordLabel.save();
            res.send(recordLabel);
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/recordLabels/delete/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    let data = await RecordLabels.findByPk( req.params.id );
    await data.destroy();
    res.send(data);
});