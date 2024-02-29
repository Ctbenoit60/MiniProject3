const express = require('express');
const router = express.Router();
const eventController = require('../controllers');

// GET all events
// Example endpoint: http://localhost:4000/api/events
router.get('/', eventController.getEvents);

// POST create a new event
// Example endpoint: http://localhost:4000/api/events
router.post('/', eventController.createEvent);

// PUT update an existing event by ID
// Example endpoint: http://localhost:4000/api/events/<id>
router.put('/:id', eventController.updateEvent);

// DELETE an event by ID
// Example endpoint: http://localhost:4000/api/events/<id>
router.delete('/:id', eventController.deleteEvent);

module.exports = router;