const express = require("express");
const { sequelize, Follows, Artists, Listeners } = require("../models");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const route = express.Router();
const Joi = require('joi');
route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;
 

function valdateInput(input){
    const JoiSchema = Joi.object({
        listenerID: Joi.number()
                .integer()
                .required(),
        artistID: Joi.number()
                .integer()
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

route.get("/follows", async (req, res) => {
    try{
        const follows = await Follows.findAll({include: [Artists, Listeners]});
        return res.json(follows);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/follows", async (req,res) => { 
    const {role} = req.user;
    if(role == "listener"){
        const {listenerID} = req.user;
        if(req.body.listenerID != listenerID){
            return res.sendStatus(403);
        }
    }
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }

    const data = {
        listenerID : req.body.listenerID,
        artistID:  req.body.artistID
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let follow = await Follows.create(req.body);
        res.send(follow);
    }
    
});

route.put("/follows/change/:id", async (req,res) => { 
    try{
        let follow = await Follows.findByPk( req.params.id );

        const {role} = req.user;
        if(role == "listener"){
            const {listenerID} = req.user;
            if(req.body.listenerID != listenerID){
                return res.sendStatus(403);
            }
        }
        if(role != "admin" && role != "listener"){
            return res.sendStatus(403);
        }
        const data = {
            listenerID : req.body.listenerID,
        artistID:  req.body.artistID
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            follow.listenerID = req.body.listenerID;
            follow.artistID = req.body.artistID;
            await follow.save();
            res.send(follow);
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/follows/delete/:id", async (req,res) => { 
    let data = await Follows.findByPk( req.params.id );

    const {role} = req.user;
    if(role == "listener"){
        const {listenerID} = req.user;
        if(req.body.listenerID != listenerID){
            return res.sendStatus(403);
        }
    }
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    
    await data.destroy();
    res.send(data);
});