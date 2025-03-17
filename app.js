const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
require('dotenv').config(); // To load environment variables from a .env file

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Atlas connection string stored in environment variable
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error: ', err));


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route for admin panel
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});

// Handling form submission for new blog posts
app.post('/admin', (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save((err) => {
        if (!err) {
            res.redirect('/');
        } else {
            res.send('Error saving the post: ' + err);
        }
    });
});

// Start the server
const port = process.env.PORT || 3000; // Use the PORT provided by Render, or default to 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
