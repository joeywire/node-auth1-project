const router = require("express").Router();
const bcrypt = require('bcryptjs'); 

const User = require('../users/users-model');

router.post("/register", async (req, res) => {
  const creds = req.body; 
  const rounds = process.env.HASH_ROUNDS || 4;
  const hash = bcrypt.hashSync(creds.password, rounds);
  creds.password = hash; 

  try { 
    const savedData = await User.add(creds); 
    res.status(200).json({ message: savedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;