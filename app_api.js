const path = require("path");
const express = require("express");
const { sequelize } = require("./models");
const app = express();
require('dotenv').config();

const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.static('static'));

const adminRoutes = require("./routes/admin.js");
app.use("/api", adminRoutes);

const albumRoutes = require("./routes/album.js");
app.use("/api", albumRoutes);

const artistRoutes = require("./routes/artist.js");
app.use("/api", artistRoutes);

const artistCollaborationRoutes = require("./routes/artistCollaboration.js");
app.use("/api", artistCollaborationRoutes);

const collaborationRoutes = require("./routes/collaboration.js");
app.use("/api", collaborationRoutes);

const episodeRoutes = require("./routes/episode.js");
app.use("/api", episodeRoutes);

const followRoutes = require("./routes/follow.js");
app.use("/api", followRoutes);

const listenerRoutes = require("./routes/listener.js");
app.use("/api", listenerRoutes);

const listenerPodcastRoutes = require("./routes/listenerPodcast.js");
app.use("/api", listenerPodcastRoutes);

const playlistRoutes = require("./routes/playlist.js");
app.use("/api", playlistRoutes);

const playlistSongRoutes = require("./routes/playlistSong.js");
app.use("/api", playlistSongRoutes);

const podcastRoutes = require("./routes/podcast.js");
app.use("/api", podcastRoutes);

const recordLabelRoutes = require("./routes/recordLabel.js");
app.use("/api", recordLabelRoutes);

const reviewRoutes = require("./routes/review.js");
app.use("/api", reviewRoutes);

const songRoutes = require("./routes/song.js");
app.use("/api", songRoutes);


app.listen({ port:8080 }, async () => {
    console.log("Started server on localhost:8080");
    await sequelize.authenticate();
});