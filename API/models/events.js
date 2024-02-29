const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  // Other fields (location, attendees, reminders, etc.)
});

module.exports = mongoose.model('event', eventSchema);
