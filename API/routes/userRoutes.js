let express = require("express");
let router = express.Router();
let Controllers = require('../controllers'); // This auto references index.js

//Use Method GET to return all users
//http://localhost:4000/api/users/ adds Get route to return users
router.get('/', (req,res) => {
    Controllers.user.getUsers(res);
});

// Use Post Method to create a user
//http://localhost:4000/api/users/signup
router.post("/signup", (req,res) => {
    Controllers.user.createUser(req.body, res);
});

// Use Put Method to update a user
//http://localhost:4000/api/users/<id> 
router.put("/:id", (req, res) => {
    Controllers.user.updateUser(req, res);
  });

 //Use Delete Method to delete a usr
  // http: //localhost:4000/api/users/<id> 
router.delete("/:id", (req, res) => {
    Controllers.user.deleteUser(req, res);
  });

  router.post("/login", (req, res) => {
    Controllers.user.loginUser(req, res);
  });
  
  module.exports = router;