const express = require('express');
const router = express.Router();

router.get('',(req,res)=>{
    const locals = {
        title: "Node JS Blog",
        description: "Simple Blog Website using mongo DB, Express JS."
    }
    res.render('index',{locals});
});

router.get('',(req,res)=>{
    res.render('about');
});


module.exports =  router;