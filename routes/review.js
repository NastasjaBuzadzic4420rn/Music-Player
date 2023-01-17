const express = require("express");
const { sequelize, Reviews, Listeners, Songs } = require("../models");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const route = express.Router();
const Joi = require('joi');
route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

function valdateInput(input){
    const JoiSchema = Joi.object({
        comment: Joi.string()
                .min(1)
                .max(200),
        rating: Joi.number()
                .integer(),
        songID: Joi.number()
                .integer()
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

route.get("/reviews", async (req, res) => {
    try{
        const reviews = await Reviews.findAll({include: [Listeners, Songs]});
        return res.json(reviews);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/reviews", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    const data = {
        comment : req.body.comment,
        rating : req.body.rating,
        listenerID : req.body.listenerID,
        songID : req.body.songID,
    }

    if(valdateInput(data).error){
        console.log(valdateInput(data).error);
    } else {
        let review = await Reviews.create(req.body);
        if(role == "listener"){
            const {listenerID} = req.user;
            if(review.listenerID != listenerID){
                return res.sendStatus(403);
            }
        }
        res.send(review);
    }
    
});

route.put("/reviews/change/:id", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    try{
        const data = {
            comment : req.body.comment,
            rating : req.body.rating,
            listenerID : req.body.listenerID,
            songID : req.body.songID,
        }
    
        if(valdateInput(data).error){
            console.log(valdateInput(data).error);
        } else {
            let review = await Reviews.findByPk( req.params.id );
        if(role == "listener"){
            const {listenerID} = req.user;
            if(review.listenerID != listenerID){
                return res.sendStatus(403);
                }
            }
            review.comment = req.body.comment;
            review.rating = req.body.rating;
            review.listenerID = req.body.listenerID;
            review.songID = req.body.songID;
            await review.save();
            res.send(review);
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/reviews/delete/:id", async (req,res) => { 
    const {role} = req.user; 
    if(role != "admin" && role != "listener"){
        return res.sendStatus(403);
    }
    let data = await Reviews.findByPk( req.params.id );
    if(role == "listener"){
        const {listenerID} = req.user;
        if(data.listenerID != listenerID){
            return res.sendStatus(403);
        }
    }
    await data.destroy();
    res.send(data);
});