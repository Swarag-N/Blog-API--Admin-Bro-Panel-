const express = require('express'),
    router = express.Router(),
    Blog = require('../models/blogs');

//Routes Config
//0. Home
router.get("/",(request,respond)=>{
    respond.send("Goto /blogs");
});

//1. Get Blog
router.get("/blogs",(request,respond)=>{
    Blog.find((err,allBlogs)=>{
        if(err){
            console.log("There is an error");
            console.log(err);
        }else{
            respond.send(allBlogs)
        }
    });
});

// 4. Show Get
router.get("/blogs/:id",(request,respond)=>{
    Blog.findById(request.params.id,(err,foundBlog)=>{
        if(err){
            console.log(err);
        }else{
            respond.send(foundBlog);
        }
    });
});

module.exports = router;