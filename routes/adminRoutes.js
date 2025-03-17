const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    res.render('admin');
});

router.get('/login', (req, res) => res.render('login'));

router.post('/login', (req, res) => {
    if (req.body.password === process.env.ADMIN_PASSWORD) {
        req.session.admin = true;
        res.redirect('/admin');
    } else {
        res.send('Invalid Password');
    }
});

router.post('/create', async (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    const { title, content, author } = req.body;
    await Post.create({ title, content, author });
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
