module.exports = (req, res, next) => {
  //seeing if there is a session and it is logged in
  //we set this in /auth/login on success
  if(req.session && req.session.loggedIn) {
    next();
  } else {
    //clog the pipe - no data sent back to client
    res.status(401).json({ message: "You cannot pass!"});
  }
}