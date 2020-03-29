const express 	= require("express"),
	mongoose 	= require("mongoose"),
	Blog 		= require("./models/blogs.js"),
	session = require('express-session'),
	expressSanitizer = require("express-sanitizer"),
	adminRouter=require("./router/adminbro"),
	indexRouter = require('./router/indexRoutes'),
	bodyParser=require("body-parser"),
	apk 		= express();

apk.use(expressSanitizer());
apk.use(bodyParser.json());
const MongoDataBase = process.env.MONGO_URl ||"mongodb://localhost:27017/home";
const connectDb = async ()=>{
	mongoose.connect(MongoDataBase, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}, ()=>{
		apk.use("/admin",adminRouter);
		console.warn("db connected");
	}
	);
};
connectDb();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


apk.use("/",indexRouter);

apk.use(session({
	secret: 'keyboard cat',
	name:"C4Projects",
	resave: true,
	saveUninitialized: true,
	cookie: { secure: true }
}));


const run = async()=>{
	// await
	// await mongoose.connect(MongoDataBase, { useNewUrlParser: true});
	await apk.listen(3000,()=>{console.log("Server Is Running")});
};

run();