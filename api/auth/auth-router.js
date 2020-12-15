const router = require("express").Router();
const bcrypt = require('bcryptjs'); 

const User = require('../users/users-model');

router.post("/register", (req, res) => {
  res.status(200).json({ sure: "thing boss"});
});

module.exports = router;