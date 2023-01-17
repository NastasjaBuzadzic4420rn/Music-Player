const express = require("express");
const { sequelize, Albums, Artists, Collaborations } = require("../models");
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

route.get("/albums", async (req, res) => {
    try{
        const albums = await Albums.findAll({include: [ Artists, Collaborations ]});
        return res.json(albums);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/albums", async (req,res) => { 
    const {role, artistID} = req.user;
    if(role != "admin" && role != "singer"){
        return res.sendStatus(403);
    }
    const data = {
        name : req.body.name,
        artistID : req.body.artistID,
        collaborationID : req.body.collaborationID
    }

    if(valdateInput(data).error){
        console.log("Error: Input is not valid.")
    } else {
        let newAlbum = await Albums.create(req.body);
        if(role == "singer" && artistID != newAlbum.artistID){
            return res.sendStatus(403);
        }
        res.send(newAlbum);
    }
    
});

route.put("/albums/change/:id", async (req,res) => { 
    const {role, artistID} = req.user;

    if(role != "admin" && role != "singer"){
        return res.sendStatus(403);
    }
    
    
    try{
        let album = await Albums.findByPk( req.params.id );
        if(role == "singer" && artistID != album.artistID){
            return res.sendStatus(403);
        }
        const data = {
            name : req.body.name,
            artistID : req.body.artistID,
            collaborationID : req.body.collaborationID
        }
    
        if(valdateInput(data).error){
            console.log("Error: Input is not valid.")
        } else {
            album.name = req.body.name;
            album.artistID = req.body.artistID;
            album.collaborationID = req.body.collaborationID;
            await album.save();
            res.send(album);
        }
       
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.delete("/albums/delete/:id", async (req,res) => {
    let album = await Albums.findByPk( req.params.id );

    const {role, artistID} = req.user;
    if(role != "admin" && role != "singer"){
        return res.sendStatus(403);
    } 
    if(role == "singer" && artistID != album.artistID){
        return res.sendStatus(403);
    }
    
    await album.destroy();
    res.send(album);
});