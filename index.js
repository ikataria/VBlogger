const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

const validateMiddleWare = require('./middleware/validationMiddleware');

const app = new express();
const port = 4000;

mongoose.connect('mongodb+srv://admin:admin@cluster0.gxzxfor.mongodb.net/cleanBlogPost');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


//  app.use('/posts/store', validateMiddleWare);

app.get('/', homeController)

// app.get('/about', (req, res) => {
//     res.render("about");
// })

// app.get('/contact', (req, res) => {
//     res.render("contact");
// })

app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController);

// Handler below if for posting new POST through form
app.post('/posts/store', validateMiddleWare, storePostController)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})