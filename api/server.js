const express = require('express'); 
const morgan = require('morgan'); 
const helmet = require('helmet');
const userRouter = require('./users/users-router');


const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny')); 

server.use("/api/users", userRouter); 

server.get("/", (req, res) => {
  res.json({ api: "up and running" });
});

module.exports = server;