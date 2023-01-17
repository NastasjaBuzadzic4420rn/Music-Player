const express = require("express");
const { sequelize, Playlists, Listeners } = require("../models");
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
        listenerID: Joi.number()
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

route.get("/playlists", async (req, res) => {
    try{
        const playlists = await Playlists.findAll({include: [Listeners]});
        return res.json(playlists);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/playlists", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    const data = {
        name : req.body.name,
        listenerID : req.body.listenerID
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let playlist = await Playlists.create(req.body);
        if(role == "listener"){
            const {listenerID} = req.user;
            if(playlist.listenerID != listenerID){
                return res.sendStatus(403);
            }
        }
        res.send(data);
    }
    
});

route.put("/playlists/change/:id", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    
    try{
        const data = {
            name : req.body.name,
            listenerID : req.body.listenerID
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let playlist = await Playlists.findByPk( req.params.id );
        if(role == "listener"){
            const {listenerID} = req.user;
            if(playlist.listenerID != listenerID){
                    return res.sendStatus(403);
                }
            }
        playlist.name = req.body.name;
        playlist.listenerID = req.body.listenerID;
        await playlist.save();
        res.send(playlist);
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/playlists/delete/:id", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    let playlist = await Playlists.findByPk( req.params.id );
    if(role == "listener"){
        const {listenerID} = req.user;
        if(playlist.listenerID != listenerID){
            return res.sendStatus(403);
        }
    }
    await playlist.destroy();
    res.send(playlist);
});