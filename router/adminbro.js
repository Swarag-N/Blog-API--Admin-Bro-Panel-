const AdminBro = require('admin-bro'),
    express=require('express'),
    AdminBroExpress = require('admin-bro-expressjs'),
    AdminBroMongoose = require('admin-bro-mongoose'),
    Blog=require('../models/blogs'),
    session = require('express-session');

AdminBro.registerAdapter(AdminBroMongoose);

// const adminRouter = express.Router();

const adminBro = new AdminBro({
  resources:[{
      resource: Blog,
      options:{
          listProperties:['title','date'],
          filterProperties:["date","title"],
          editProperties :["title", "info", "image"]
      },
  }],
  softwareBrothers: false,
	branding:{
    companyName: 'C4P'
    }
  }
);

const router = AdminBroExpress.buildRouter(adminBro);
module.exports = router;
// const Admin ={
// 	email : process.env.EMAIL_OF_ADMIN   || 'example@c4p.com',
// 	password : process.env.PASSWORD_OF_ADMIN || 'coding'
// };
//
//
// AdminBroExpress.buildAuthenticatedRouter(
//     adminBro,
//     {
//         authenticate:async(email, password)=>{
//             if (email === Admin.email && password === Admin.password) {
//                 return Admin
//             }
//             return null
//         },
//         cookieName: process.env.COOKIE_ADMIN_NAME || 'C-4-P',
//         cookiePassword: process.env.COOKIE_ADMIN_PASSWORD || 'admin-bro',
//     },
//     adminRouter,
//     {
//         resave:true,
//         saveUninitialized: true
//     }
//     );

// module.exports = adminRouter;