const express = require("express");
const { sequelize, ListenerPodcasts, Listeners, Podcasts } = require("../models");
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
        podcastID: Joi.number()
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

route.get("/listenerPodcasts", async (req, res) => {
    try{
        const listenerPodcasts = await ListenerPodcasts.findAll({include: [ Listeners, Podcasts ]});
        return res.json(listenerPodcasts);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/listenerPodcasts", async (req,res) => {
    const {role} = req.user; 
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }

    const data = {
        listenerID : req.body.listenerID,
        podcastID : req.body.podcastID,
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let listenerPodcast = await ListenerPodcasts.create(req.body);
        if(role == "listener"){
            const {listenerID} = req.user;
            if(listenerPodcast.listenerID != listenerID){
                return res.sendStatus(403);
            }
        }
        res.send(listenerPodcast);
    }
    
    
});

route.put("/listenerPodcasts/change/:id", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    
    try{
        const data = {
            listenerID : req.body.listenerID,
            podcastID : req.body.podcastID,
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let listenerPodcast = await ListenerPodcasts.findByPk( req.params.id );
            if(role == "listener"){
                const {listenerID} = req.user;
                if(listenerPodcast.listenerID != listenerID){
                    return res.sendStatus(403);
                }
            }
            listenerPodcast.listenerID = req.body.listenerID;
            listenerPodcast.podcastID = req.body.podcastID;
            await listenerPodcast.save();
            res.send(listenerPodcast);
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/listenerPodcasts/delete/:id", async (req,res) => {
    const {role} = req.user; 
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    
    
    let data = await ListenerPodcasts.findByPk( req.params.id );
    if(role == "listener"){
        const {listenerID} = req.user;
        if(data.listenerID != listenerID){
            return res.sendStatus(403);
        }
    }
    await data.destroy();
    res.send(data);
});