const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post');

const router = express.Router();

module.exports = router
    .get('/', (req, res) => {
        Post.find({}, (err, posts) => {
            err ? console.log(err) : res.json(posts);
        });
    });

