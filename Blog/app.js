require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const connectDB = require('./server/config/db');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const app = express();
const PORT = 5000 || process.env.PORT;


//Connect DB
connectDB();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat', // A secret key used to sign the session ID cookie
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));

app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))

app.get('/',(res,req)=> {
    res.send("hello");
})
app.listen(PORT ,  ()=> {
    console.log(`App listening on port ${PORT}`)
});

