const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('', (req, res) => {
    const locals = {
        title: "Node JS Blog",
        description: "Simple Blog Website using mongo DB, Express JS."
    }

    try{
        const data = Post.find();
        res.render('index', {locals, data });
    } catch(error){
        console.log(error);
    }
});


router.get('/about', (req, res) => {
    res.render('about');
});

// function insertPostData() {
//     Post.insertMany([
//         {
//             title: "Building a blog",
//             body: "This is the body text"
//         },
//         {
//             title: "Deployment of Node.js applications",
//             body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//         },
//         {
//             title: "Authentication and Authorization in Node.js",
//             body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//         },
//         {
//             title: "Understand how to work with MongoDB and Mongoose",
//             body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//         },
//         {
//             title: "build real-time, event-driven applications in Node.js",
//             body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//         }
//     ])
// }

module.exports = router;