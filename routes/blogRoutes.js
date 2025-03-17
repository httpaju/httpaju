const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const posts = await Post.find().sort({ date: -1 });
    res.render('index', { posts });
});

router.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', { post });
});

module.exports = router;
