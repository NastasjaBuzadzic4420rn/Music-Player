const express = require("express");
const { sequelize, Podcasts, Artists, Collaborations } = require("../models");
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
        artistID: Joi.number()
                .integer(),
        collaborationID: Joi.number()
                .integer()
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

route.get("/podcasts", async (req, res) => {
    try{
        const podcasts = await Podcasts.findAll({include: [Artists, Collaborations]});
        console.log(podcasts);
        return res.json(podcasts);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/podcasts", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin" && role != "podcaster"){
        return res.sendStatus(403);
    }
    const data = {
        name : req.body.name,
        artistID : req.body.artistID,
        collaborationID : req.body.collaborationID
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let podcast = await Podcasts.create(req.body);
        if(role == "podcaster"){
            const {artistID} = req.user;
            if(podcast.artistID != artistID){
                return res.sendStatus(403);
            }
        }
        res.send(podcast);
    }
   
});

route.put("/podcasts/change/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin" && role != "podcaster"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            name : req.body.name,
            artistID : req.body.artistID,
            collaborationID : req.body.collaborationID
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let podcast = await Podcasts.findByPk( req.params.id );
            if(role == "podcaster"){
                const {artistID} = req.user;
                if(podcast.artistID != artistID){
                    return res.sendStatus(403);
                }
            }
            podcast.name = req.body.name;
            podcast.collaborationID = req.body.collaborationID;
            podcast.artistID = req.body.artistID;
            await podcast.save();
            res.send(podcast);
        }
       
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/podcasts/delete/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin" && role != "podcaster"){
        return res.sendStatus(403);
    }
    let data = await Podcasts.findByPk( req.params.id );
    if(role == "podcaster"){
        const {artistID} = req.user;
        if(data.artistID != artistID){
            return res.sendStatus(403);
        }
    }
    await data.destroy();
    res.send(data);
});