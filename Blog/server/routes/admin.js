const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dir = '../views/layouts/admin';

// GET
// ADMIN - LOGIN PAGE

router.get('/admin', async (req, res) => {
    try{
        const locals = {
            title: "Admin",
            description: "Simple Blog Website using mongo DB, Express JS.",
        }
        const data = await Post.find();
        res.render('admin/index', {locals , layout: dir});
    } catch(error){
        console.log(error); 
    }
});


function insertMany(req_username, req_password) {
    User.insertMany({
        username: req_username,
        password: req_password
    });
}

// insertMany()


// POST
// ADMIN - LOGIN CHECK

router.post('/login', async (req, res) => {
    try{
        const { username , password } = req.body;        
        const user = await User.findOne({username}); 

        if (user){
            if(user.password == password){
                // res.status(200).json({message: 'Login Successful'});
                res.redirect('/main')
            } else {
                res.status(401).json({message: "Incorrect Password"});
            }w
        }
        else {
            res.status(400).json({message: "User Not Found"});
        }
    } catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
});

// POST
// ADMIN - Register

router.post('/register', async (req, res) => {
    try{
        const { requsername , reqpassword } = req.body;        
        const user = await User.findOne({requsername}); 

        if (user){
            if(user.reqpassword == password){
                res.status(200).json({message: 'Login Already Present'});
            }// else {
            //     res.status(401).json({message: "Incorrect Password"});
            // }
        }
        else {
            insertMany(requsername, reqpassword);
            res.status(200).json({message: 'Registration Done'});
        }
    } catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
});

module.exports = router;