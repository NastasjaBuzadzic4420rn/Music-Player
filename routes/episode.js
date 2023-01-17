const express = require("express");
const { sequelize, Episodes } = require("../models");
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
        guest: Joi.string(),
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

route.get("/episodes", async (req, res) => {
    try{
        const episodes = await Episodes.findAll();
        return res.json(episodes);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/episodes", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"  && role != "podcaster"){
        return res.sendStatus(403);
    }
    const data = {
        name : req.body.name,
        guest : req.body.guest,
        podcastID : req.body.podcastID
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let newEpisode = await Episodes.create(req.body);
        res.send(newEpisode);
    }
    
});

route.put("/episodes/change/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"  && role != "podcaster"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            name : req.body.name,
            guest : req.body.guest,
            podcastID : req.body.podcastID
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let newEpisode = await Episodes.findByPk( req.params.id );

            newEpisode.name = req.body.name;
            newEpisode.guest = req.body.guest;
            newEpisode.podcastID = req.body.podcastID;
            await newEpisode.save();
            res.send(newEpisode);
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/episodes/delete/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"  && role != "podcaster"){
        return res.sendStatus(403);
    }
    let newEpisode = await Episodes.findByPk( req.params.id );
    await newEpisode.destroy();
    res.send(newEpisode);
});