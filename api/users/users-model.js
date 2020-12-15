const db = require('../../database/dbConfig'); 

const getAll = () => {
  return db("users").orderBy('id'); 
};

const add = (user) => {
  return db("users").insert(user); 
};

module.exports = {
  getAll, 
  add
}