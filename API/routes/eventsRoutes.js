const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// GET all events
// Example endpoint: http://localhost:4000/api/events
router.get("/", (req, res) => {
  Controllers.eventController.getEvents(res);
});

// POST create a new event
// Example endpoint: http://localhost:4000/api/events/create
router.post("/create", (req,res) => {
    Controllers.eventController.createEvent(req.body, res);
});

// PUT update an existing event by ID
// Example endpoint: http://localhost:4000/api/events/<id>
router.put("/:id", (req, res) => {
    Controllers.eventController.updateEvent(req, res);
  });

// DELETE an event by ID
// Example endpoint: http://localhost:4000/api/events/<id>
router.delete("/:id", (req, res) => {
    Controllers.eventController.deleteEvent(req, res);
  });

module.exports = router;
