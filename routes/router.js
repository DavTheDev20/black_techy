const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post');

const router = express.Router();

module.exports = router
    .get('/', (req, res) => {
        Post.find({}, (err, posts) => {
            err ? console.log(err) : res.json(posts);
        });
    })
    .post('/save', (req, res) => {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content
        })
        newPost.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    msg: 'Saved post successfully.'
                });
            }
        });
    })
    .delete('/delete', (req, res) => {
        Post.deleteOne({ _id: req.body._id }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    msg: 'Deleted post successfully.'
                });
            }
        })
    });

