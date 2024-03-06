const Models = require("../models");

// Retrieve all events from the database
const getEvents = (res) => {
  Models.Event.find({})
  .then((data) => res.send( {result: 200, data: data}))
  .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message});
  });
};

// Create a new event in the database
const createEvent = (data, res) => {
  console.log(data);
  new Models.Event(data)
  .save()
  .then((data) => res.send({result: 200, data: data}))
  .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
  });
}

// Update an existing event's information in the database
const updateEvent = (req, res) => {
  // updates the user matching the ID from the param using JSON data POSTed in request body
  console.log('update event', req.body);
  Models.Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

// Delete an event from the database
const deleteEvent = (req, res) => {
 // deletes the user matching the ID from the param
 Models.Event.findByIdAndDelete(req.params.id)
 .then(res.status(200).send({ result: 200, data: "User deleted"})) //SUDO this sends the string message on delete.
 // |Keeping below just incase I want to change data quickly|
 //   .then((data) => res.status(200).send({ result: 200, data: data }))
   .catch((err) => {
     console.log(err);
     res.status(500).send({ result: 500, error: err.message });
   });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};