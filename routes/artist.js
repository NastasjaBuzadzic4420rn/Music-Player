const express = require("express");
const { sequelize, Artists, RecordLabels } = require("../models");
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
        password: Joi.string()
                .min(4)
                .max(30)
                .required(),
        isSinger: Joi.boolean(),
        recordLabelID: Joi.number()
                .integer().default(1),

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

route.get("/artists", async (req, res) => {
    try{
        const artists = await Artists.findAll({include: [RecordLabels]});
        return res.json(artists);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/artists", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    const data = {
        name : req.body.name,
        password : req.body.password,
        isSinger : req.body.isSinger,
        recordLabelID : req.body.recordLabelID,
    }
    
    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let newArtist = await Artists.create(data);
        res.send(newArtist);
    }
});

route.put("/artists/change/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            name : req.body.name,
            password : req.body.password,
            isSinger : req.body.isSinger,
            recordLabelID : req.body.recordLabelID,
        }
        
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let artists = await Artists.findByPk( req.params.id );
            artists.name = req.body.name;
            artists.isSinger = req.body.isSinger;
            artists.recordLabelID = req.body.recordLabelID;
            artists.password = req.body.password;
            await artists.save();
            res.send(artists);
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/artists/delete/:id", async (req,res) => { 
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    let artist = await Artists.findByPk( req.params.id );
    await artist.destroy();
    res.send(artist);
});
