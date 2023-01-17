const path = require("path");
const express = require("express");
const { sequelize } = require("./models");
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


function getCookies(req) {
    if (req.headers.cookie == null) {
        return {};
    }

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) {
        console.log("token" + token);
        console.log("cookies" + cookies);
        return res.redirect(301, '/login');
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) {
            console.log(err);
            return res.redirect(301, '/login');
        }
    
        req.user = user;
    
        next();
    });
}


app.use(express.static('static'));


app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static/login' });
});

app.get('/registerListener', (req, res) => {
    res.sendFile('registerListener.html', { root: './static/login' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static/login' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});


app.get("/admins", authToken,  (req, res) => {
    const {role} = req.user;
    if (role != "admin"){
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admins.html'));
});

app.get("/albums", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'albums.html'));
});

app.get("/artists", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'artists.html'));
});

app.get("/artistCollaborations", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'artistCollaborations.html'));
});

app.get("/collaborations", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'collaborations.html'));
});

app.get("/episodes", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'episodes.html'));
});

app.get("/follows", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'follows.html'));
});

app.get("/listeners", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'listeners.html'));
});

app.get("/listenerPodcasts", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'listenerPodcasts.html'));
});

app.get("/playlists", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'playlists.html'));
});

app.get("/playlistSongs", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'playlistSongs.html'));
});

app.get("/podcasts", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'podcasts.html'));
});

app.get("/recordLabels", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'recordLabels.html'));
});


app.get("/reviews", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'reviews.html'));
});

app.get("/songs", authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'songs.html'));
});


app.listen({ port:8000 }, async () => {
    console.log("Started server on localhost:8000");
    await sequelize.authenticate();
});