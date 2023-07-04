const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewared/requireAuth');

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id });

    return res.json(tracks);
});

router.post("/tracks", async (req, res) => {
    const { name, locations }= req.body;

    if (!name || !locations) {
        return res.status(422).json({ error: "You must provide name and locations" });
    }

    try{
        const track = await Track.create({ name, locations, userId: req.user.id });
        return res.json(track);
    } catch (err) {
        return res.json({ error: err.message });
    }
});

module.exports = router;