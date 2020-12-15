const express = require('express'); 
const morgan = require('morgan'); 
const helmet = require('helmet');
const cors = require('cors'); 
const session = require('express-session'); 
//Will Return a COnstructor
const KnexSessionStore = require('connect-session-knex')(session); 

const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const dbConfig = require('../database/dbConfig');
const authentication = require('./auth/authentication-middleware');  


const server = express();

//setting session options - see docs
const sessionConfiguration = {
  name: "theFunCookie", //default value is sid(session id)
  //required - secret used to sign session ID cookie - str or array
  secret: process.env.SESSION_SECRET || 'secretsRsafe', 
  cookie: {
    maxAge: 600000,
    //https?
    secure: process.env.USE_SECURE_COOKIES || false, 
    //prevent client JS from accessing this cookie
    //Set to true by default but we always want to write this? 
    httpOnly: true  
  },
  //forces session to be saved back to session store
  resave: false, 
  //forces "uninitialized" (new but not modified???) session to the store
  saveUninitialized: true, 
  //session store instance 
  store: new KnexSessionStore({
    //knex instance to use
    knex: dbConfig,
    //set table name - default is 'sessions'
    tablename: 'sessions', 
    //field name in table - default is 'sid'
    sidfiledname: 'sid', 
    //time to check and remove expired sessions from db
    clearInterval: 1800000 
  })
};

//GLOBAL MIDDLEWARE
//Global session
server.use(session(sessionConfiguration));
server.use(express.json());
server.use(helmet());
server.use(morgan('tiny')); 
server.use(cors()); 

//ROUTES
server.use("/api/users",authentication, userRouter); 
server.use("/api/auth", authRouter); 

server.get("/", (req, res) => {
  res.json({ api: "up and running" });
});

module.exports = server;