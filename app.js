const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post'); // Assuming you have a Post model defined

const app = express();
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection (Ensure .env is configured)
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// API route to fetch latest posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).limit(5); // Fetch latest 5 posts
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// API route to add a new post
app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json({ message: 'Post added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add post' });
    }
});


// Other routes, like for serving index.html, admin.html, etc.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin.html', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
