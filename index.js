const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

// Controllers
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logout = require('./controllers/logout');

// Middlewares
const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthMiddleware = require('./middleware/redirectIfAuthMiddleware');

mongoose.connect('mongodb+srv://admin:admin@cluster0.gxzxfor.mongodb.net/cleanBlogPost');

global.loggedIn = null;
const port = 4000;

const app = new express();
// Package registration
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(flash());
app.use(expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
})


app.get('/', homeController);

app.get('/auth/register', redirectIfAuthMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthMiddleware, loginController);
app.get('/auth/logout', logout);
app.post('/users/register', redirectIfAuthMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthMiddleware, loginUserController);

app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.use((req, res) => res.render('notfound'))

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})