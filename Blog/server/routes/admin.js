const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dir = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

// Check Login
const checkMiddleware = (res,req,next)=>{
    const token  = res.cookies.token;

    if(!token){
        res.render('admin/logout');
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    }catch(error){
        res.render('admin/logout');
    }
}



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

router.post('/admin', async (req, res) => {
    try{
        const { username , password } = req.body;        
        const user = await User.findOne({username}); 

        if (user){
            if(user.password == password){
                // res.status(200).json({message: 'Login Successful'});
                const token = jwt.sign({ userId: user._id}, jwtSecret);
                res.cookie('token',token,{ httpOnly: true});
                res.redirect('/dashboard');
            } else {
                res.status(401).json({message: "Incorrect Password"});
            }
        }
        else {
            res.status(400).json({message: "User Not Found"});
        }
    } catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
});

// GET
// ADMIN - DASHBOARD CHECK

router.get('/dashboard', checkMiddleware, async (req, res) => {
    try{
        locals = {
            title: 'Dashboard',
            description : "Simple Blog Website using mongo DB, Express JS."
        }

        const data = await Post.find();
        res.render('admin/dashboard',{
            locals,data,layout:dir
        });
    } catch(error){
        console.log(error);
    }
})

// POST
// ADMIN - Register

// router.post('/register', async (req, res) => {
//     try{
//         const { requsername , reqpassword } = req.body;        
//         const user = await User.findOne({requsername}); 

//         if (user){
//             if(user.reqpassword == password){
//                 res.status(200).json({message: 'Login Already Present'});
//             }// else {
//             //     res.status(401).json({message: "Incorrect Password"});
//             // }
//         }
//         else {
//             insertMany(requsername, reqpassword);
//             res.status(200).json({message: 'Registration Done'});
//         }
//     } catch(error){
//         console.error(error);
//         res.status(500).json({message : 'Internal Server Error'});
//     }
// });


// GET
// ADD-POST - NEW BLOG ROUTE

router.get('/add-post', checkMiddleware, async(req,res)=>{
    try{
        locals = {
            title: 'Add Post',
            description : "Simple Blog Website using mongo DB, Express JS."
        }
        res.render('admin/add-post',{
            locals,layout: dir
        });
    } catch(error){
        console.log(error);
    }
})

// POST
// ADD-POST - NEW BLOG INSERT CHECK

router.post('/add-post', checkMiddleware, async (req,res)=>{
    try {
        const {title,body} = req.body;
        await Post.insertMany({
            title: title,
            body: body
        });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
})

// GET
// EDIT-POST - EDIT BLOG
router.get('/edit-post/:id', checkMiddleware, async (req,res)=>{
    try {
        const data = await Post.findOne({_id: req.params.id});
        const locals = {
            title: "Edit Post"
        }
        res.render('admin/edit-post',{
            data, layout:dir, locals
        });
    } catch (error) {
        console.log(error);
    }
})

// PUT
// EDIT-POST - EDIT BLOG
router.put('/edit-post/:id', checkMiddleware, async (req,res)=>{
    try {
        await Post.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            body: req.body.body,
            updateAt: Date.now()
        })
        res.redirect(`/edit-post/${req.params.id}`);

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;