const express = require('express');
const { sequelize, Admins, Artists, Listeners } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const admin = require('./models/admin');
require('dotenv').config();

const app = express();

const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());



app.post('/register', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    Admins.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/login', (req, res) => {

    var found = false;

    Admins.findAll().then(admins =>{
        admins.forEach(el => {
            if(el.name === req.body.name){
                if(req.body.password === el.password){
                    found = true;
                    const obj = {
                        adminID: el.adminID,
                        name: el.name,
                        role: "admin"
                    };
                
                    const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                        
                    res.json({ token: token });
                    
                } else {
                    res.status(400).json({ msg: "Invalid credentials"});
                }
            }
        })
        if(!found){
            Artists.findAll().then(artists =>{
                artists.forEach(el => {
                    if(el.name === req.body.name){
                        if(req.body.password === el.password){
                            found = true;
                            let thisRole = "";
                            if(el.isSinger == true){
                                thisRole = "singer";
                            } else {
                                thisRole = "podcaster";
                            }
                            const obj= {
                                artistID: el.artistID,
                                name: el.name,
                                role: thisRole
                            };
                               
                            
                    
                            const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                            
                                res.json({ token: token });
                        } else {
                                res.status(400).json({ msg: "Invalid credentials"});
                        }
                    }
                })
                if(!found){
                    Listeners.findAll().then(listeners =>{
                        listeners.forEach(el => {
                            if(el.name == req.body.name){
                                    if(req.body.password === el.password){
                                        const obj = {
                                            listenerID: el.listenerID,
                                            name: el.name,
                                            role: "listener"
                                        };
                                
                                        const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                                        
                                        res.json({ token: token });
                                } else {
                                    res.status(400).json({ msg: "Invalid credentials"});
                                }
                            }
                        })
                    });
                }
            });
        }
    });
    
   
    
    
});

app.listen({ port: 9000 }, async () => {
    console.log("Started server on localhost:9000");
    await sequelize.authenticate();
}); 
