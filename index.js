const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const BlogPost = require('./models/BlogPost');

const app = new express();
const port = 4000;

mongoose.connect('mongodb+srv://admin:admin@cluster0.gxzxfor.mongodb.net/cleanBlogPost');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    console.log(blogposts);
    res.render("index", {
        blogposts
    });
})

app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render("about");
})

app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
    res.render("contact");
})

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render("post", {
        blogpost
    });
})

app.get('/posts/new', (req, res) => {
    res.render("create");
})

app.post('/posts/store', async (req, res) => {
    console.log('req.body::', req.body);
    await BlogPost.create(req.body);
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})