const express 	= require("express"),
	mongoose 	= require("mongoose"),
	Blog 		= require("./models/blogs.js"),
	session = require('express-session'),
	expressSanitizer = require("express-sanitizer"),
	adminRouter=require("./router/adminbro")
	bodyParser=require("body-parser"),
	apk 		= express();

apk.use(expressSanitizer());
apk.use(bodyParser.json())
const MongoDataBase = process.env.MONGO_URl ||"mongodb://localhost:27017/home"
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

apk.use("/admin",adminRouter)

apk.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))

//Routes Config 
//0. Home
apk.get("/",(request,respond)=>{
	respond.send("Goto /blogs");
});

//1. Get Blogs
apk.get("/blogs",(request,respond)=>{
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
apk.get("/blogs/:id",(request,respond)=>{
	Blog.findById(request.params.id,(err,foundBlog)=>{
		if(err){
			consloe.log(err);
		}else{
			respond.send(foundBlog);
		}
	});
});

const run = async()=>{
	await mongoose.connect(MongoDataBase, { useNewUrlParser: true});
	await apk.listen(3000,()=>{console.log("Server Is Running")})
}

run()