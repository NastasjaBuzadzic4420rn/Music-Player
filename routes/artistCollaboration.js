const express = require("express");
const { sequelize, ArtistCollaborations, Artists, Collaborations } = require("../models");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const route = express.Router();
const Joi = require('joi');
route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

function valdateInput(input){
    const JoiSchema = Joi.object({
        artistID: Joi.number()
                .integer()
                .required(),
        collaborationID: Joi.number()
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

route.get("/artistCollaborations", async (req, res) => {
    const {role} = req.user;
    if(role != "admin"  && role != "singer" && role != "podcaster"){
        return res.sendStatus(403);
    }
    try{
        const artistCollaborations = await ArtistCollaborations.findAll({include: [Artists, Collaborations]});
        return res.json(artistCollaborations);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/artistCollaborations", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"  && role != "singer" && role != "podcaster"){
        return res.sendStatus(403);
    }
    const data = {
        artistID : req.body.artistID,
        collaborationID : req.body.collaborationID
    }
    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let artistCollaborations = await ArtistCollaborations.create(req.body);
        res.send(artistCollaborations);
    }
    
});

route.put("/artistCollaborations/change/:id", async (req,res) => { 
    const {role, artistID} = req.user;
    if(role != "admin"  && role != "singer" && role != "podcaster"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            artistID : req.body.artistID,
            collaborationID : req.body.collaborationID
        }
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let artistCollaborations = await ArtistCollaborations.findByPk( req.params.id );
        
            artistCollaborations.artistID = req.body.artistID;
            artistCollaborations.collaborationID = req.body.collaborationID;
            await artistCollaborations.save();
            res.send(artistCollaborations);
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/artistCollaborations/delete/:id", async (req,res) => { 
    const {role, artistID} = req.user;
    if(role != "admin"  && role != "singer" && role != "podcaster"){
        return res.sendStatus(403);
    }
    let artistCollaborations = await ArtistCollaborations.findByPk( req.params.id );
    
    await artistCollaborations.destroy();
    res.send(artistCollaborations);
});