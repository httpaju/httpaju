
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});

app.post('/admin', (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save((err) => {
        if (!err) {
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
