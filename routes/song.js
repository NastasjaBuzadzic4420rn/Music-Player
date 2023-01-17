// const { response } = require("express");
const express = require("express");
const { sequelize, Songs, Artists, Collaborations, Albums} = require("../models");
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
        song: Joi.string()
                .min(1)
                .max(150)
                .required(),
        artistID: Joi.number()
                .integer(),
        collaborationID: Joi.number()
                .integer(),
        albumID: Joi.number()
                .integer(),

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


route.get("/songs", async (req, res) => {
    try{
        const songs = await Songs.findAll({include: [ Albums, Artists, Collaborations ]});
        return res.json(songs);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.post("/songs", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "singer"){
        return res.sendStatus(403);
    }
    const data = {
        name : req.body.name,
        song : req.body.song,
        artistID : req.body.artistID,
        albumID : req.body.albumID,
        collaborationID : req.body.collaborationID
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let newSong = await Songs.create(req.body);
        if(role == "singer"){
            const {singerID} = req.user;
            if(data.artistID != singerID){
                return res.sendStatus(403);
            }
        }
        res.send(newSong);
    }
    
});

route.put("/songs/change/:id", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "singer"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            name : req.body.name,
            song : req.body.song,
            artistID : req.body.artistID,
            albumID : req.body.albumID,
            collaborationID : req.body.collaborationID
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let song = await Songs.findByPk( req.params.id );
        if(role == "singer"){
            const {singerID} = req.user;
            if(data.artistID != singerID){
                return res.sendStatus(403);
                }
            }
            
            song.name = req.body.name;
            song.albumID = req.body.albumID;
            song.artistID = req.body.artistID;
            song.collaborationID = req.body.collaborationID;
            song.song = req.body.song;
            await song.save();
            res.send(song);
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/songs/delete/:id", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "singer"){
        return res.sendStatus(403);
    }
    let song = await Songs.findByPk( req.params.id );
    if(role == "singer"){
        const {singerID} = req.user;
        if(data.artistID != singerID){
            return res.sendStatus(403);
        }
    }
    await song.destroy();
    res.send(song);
});