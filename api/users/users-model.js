const db = require('../../database/dbConfig'); 

const getAll = () => {
  return db("users").orderBy('id'); 
};

const add = (user) => {
  return db("users").insert(user); 
};

const findBy = (filter) => {
  return db("users").where(filter).orderBy("id");
}; 

module.exports = {
  getAll, 
  add, 
  findBy
}