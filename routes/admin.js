const express = require("express");
const { sequelize, Admins } = require("../models");
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
    });
    return JoiSchema.validate(input);
}

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json( (err) => { msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) {
            return res.status(403).json({ msg: err });
        }

    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get("/admins", async (req, res) => {
    const {role} = req.user;
    if(role != "admin"){
        return res.sendStatus(403);
    }
    try{
        const admins = await Admins.findAll();
        return res.json(admins);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

// route.post("/admins/add/:id", async (req,res) => { 
//     let newAlbum = await Albums.create(req.body);
//     res.send(newAlbum);
// });

// route.put("/admins/change/:id", async (req,res) => { 
//     try{
//         let album = await Albums.findByPk( req.params.id );
//         album.albumID = req.body.albumID;
//         album.name = req.body.name;
//         album.artistID = req.body.artistID;
//         album.collaborationID = req.body.collaborationID;
//         await album.save();
//         res.send(album);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({ error: "Error", data: err });
//     }
// });


// route.delete("/admins/delete/:id", async (req,res) => { 
//     let album = await Albums.findByPk( req.params.id );
//     await album.destroy();
//     res.send(album);
// });