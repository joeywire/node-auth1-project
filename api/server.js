const express = require('express'); 
const morgan = require('morgan'); 
const helmet = require('helmet');
const cors = require('cors'); 
const session = require('express-session'); 
//Will Return a CoNsTrucToR
const KnexSessionStore = require('connect-session-knex')(session); 

const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const dbConfig = require('../database/dbConfig');  


const server = express();

//Lets take another look at this after some reading
const sessionConfiguration = {
  name: "theFunCookie", //default value is sid(session id)
  secret: process.env.SESSION_SECRET || 'secretsRsafe', 
  cookie: {
    maxAge: 600000,
    secure: process.env.USE_SECURE_COOKIES || false, 
    httpOnly: true //prevent client JS from accessing this cookier 
  },
  resave: false, 
  saveUninitialized: true, 
  store: new KnexSessionStore({
    knex: dbConfig,
    tablename: 'sessions', 
    sidfiledname: 'sid', 
    createInterval: 1800000 //time to check and remove expired sessions from db
  })
};

//GLOBAL MIDDLEWARE
server.use(session(sessionConfiguration));
server.use(express.json());
server.use(helmet());
server.use(morgan('tiny')); 
server.use(cors()); 

//ROUTES
server.use("/api/users", userRouter); 
server.use("/api/auth", authRouter); 

server.get("/", (req, res) => {
  res.json({ api: "up and running" });
});

module.exports = server;