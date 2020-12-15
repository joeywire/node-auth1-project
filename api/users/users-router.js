const router = require('express').Router();

const User = require('./users-model'); 

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.getAll();
    res.status(200).json(allUsers); 

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 


module.exports = router;