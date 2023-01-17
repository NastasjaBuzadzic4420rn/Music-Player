const express = require("express");
const { sequelize, PlaylistSongs, Songs, Playlists } = require("../models");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const route = express.Router();
const Joi = require('joi');
route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

function valdateInput(input){
    const JoiSchema = Joi.object({
        playlistID: Joi.number()
                .integer()
                .required(),
        songID: Joi.number()
                .integer()
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

route.get("/playlistSongs", async (req, res) => {
    const {role} = req.user;
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    try{
        const playlistSong = await PlaylistSongs.findAll({include: [Songs, Playlists]});
        return res.json(playlistSong);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/playlistSongs", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    const data = {
        playlistID : req.body.playlistID,
        songID : req.body.songID
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let playlistSong = await PlaylistSongs.create(req.body);
        res.send(playlistSong);
    }
});

route.put("/playlistSongs/change/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            playlistID : req.body.playlistID,
            songID : req.body.songID
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let playlistSong = await PlaylistSongs.findByPk( req.params.id );
        playlistSong.playlistID = req.body.playlistID;
        playlistSong.songID = req.body.songID;
        await playlistSong.save();
        res.send(playlistSong);
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/playlistSongs/delete/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    let data = await PlaylistSongs.findByPk( req.params.id );
    await data.destroy();
    res.send(data);
});