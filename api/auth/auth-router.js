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
    res.status(200).json({ savedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body; 

  try {
    const users = await User.findBy({ username }); 
    const user = users[0]; 
    if (user && bcrypt.compareSync(password, user.password)) {
      //store the session to the db
      //produce a cookie and store session id in the cookie 
      // send back a cooki to clinet w/ session id
      req.session.loggedIn = true; 
      req.session.username = user.username; 
      res.status(200).json({ message: "Welcome Authenticated Friend", session: req.session});
    } else {
      res.status(401).json({ messsage: "Invalid Credentials"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({ message: "Error while loggin out - try again"});
      } else {
        res.status(204).end();
      }
    });
  } else {
    req.status(200).json({ message: 'Allready logged out'});
  }
});

module.exports = router;