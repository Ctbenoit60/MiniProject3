let express = require("express");
let router = express.Router();
let Controllers = require('../controllers'); //main.js

//Use Method GET to return all users
//http://localhost:4000/api/users/ adds Get route to return users
router.get('/', (req,res) => {
    Controllers.userController.getUser(res);
});

// Use Post Method to create a user
//http://localhost:4000/api/users/signup
router.post("/signup", (req,res) => {
    Controllers.userController.createUser(req.body, res);
});

// Use Put Method to update a user
//http://localhost:4000/api/users/<id> 
router.put("/:id", (req, res) => {
    Controllers.userController.updateUser(req, res);
  });

 //Use Delete Method to delete a usr
  // http: //localhost:8085/api/users/<id> 
router.delete("/:id", (req, res) => {
    Controllers.userController.deleteUser(req, res);
  });
  
  module.exports = router;