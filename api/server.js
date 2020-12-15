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

//GLOBAL MIDDLEWARE
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