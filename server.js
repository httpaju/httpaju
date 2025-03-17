require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

const blogRoutes = require('./routes/blogRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/', blogRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
