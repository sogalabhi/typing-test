const express = require("express");
const Stat = require("../models/Stat")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const router = express.Router();

//Create Stat
router.post('/createstat', fetchuser, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findById(id).select("-password");
        let { stats } = req.body;
        const stat = new Stat({
            email: user.email,
            id,
            stats
        })
        const savestat = await stat.save();
        res.json(savestat)
    } catch (error) {
        res.status(500).send({ error })
    }
})
//Get user details
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findById(id).select("-password");
        res.json(user)
    } catch (error) {
        res.status(500).send({ error })
    }
})

//get stats history
router.get('/userstats', fetchuser, async (req, res) => {
    try {
        let user = req.user.id;
        const stats = await Stat.find({ id: user });
        res.json(stats);
    } catch (error) {
        res.status(500).send({ error })
    }
})
//get leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        let stats = await Stat.find().sort({ 'stats.wpm': -1 }).limit(10);
        res.json(stats);
    } catch (error) {
        res.status(500).send({ error })
    }
})
//get leaderboard filter by modes
router.get('/leaderboard/:mode', async (req, res) => {
    try {
        let stats;
        const mode = req.params.mode
        stats = await Stat.find({ 'stats.mode': mode }).sort({ 'stats.wpm': -1 }).limit(10);
        res.json(stats);
    } catch (error) {
        res.status(500).send({ error })
    }
})
module.exports = router;