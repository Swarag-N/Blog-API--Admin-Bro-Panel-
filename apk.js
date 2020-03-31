const express = require("express"),
	mongoose = require("mongoose"),
	session = require('express-session'),
	expressSanitizer = require("express-sanitizer"),
	adminRouter = require("./router/adminbro"),
	indexRouter = require('./router/indexRoutes'),
	bodyParser = require("body-parser"),
	apk = express();


const MongoDataBase = process.env.MONGO_URl || "mongodb://localhost:27017/home";
const connectDb = async () => {
	mongoose.connect(MongoDataBase, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}, () => {
			apk.use("/admin", adminRouter);
			apk.use(expressSanitizer());
			apk.use(bodyParser.json());
			apk.use("/", indexRouter);
			apk.use(session({
				secret: 'keyboard cat',
				name: "C4Projects",
				resave: true,
				saveUninitialized: true,
				cookie: {secure: true}
			}));
			console.log("Db Connected");
		}
		// apk.use("/admin",adminRouter);
		// apk.use(expressSanitizer());
		// apk.use(bodyParser.json());
		// console.warn("db connected");
		//
		// 	apk.use("/",indexRouter);
		//
		// 	apk.use(session({
		// 		secret: 'keyboard cat',
		// 		name:"C4Projects",
		// 		resave: true,
		// 		saveUninitialized: true,
		// 		cookie: { secure: true }
		// 	}));

		// }
	);
};
connectDb();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


const run = async () => {
	// await
	// await mongoose.connect(MongoDataBase, { useNewUrlParser: true});
	await apk.listen(3000, () => {
		console.log("Server Is Running")
	});
};

run();