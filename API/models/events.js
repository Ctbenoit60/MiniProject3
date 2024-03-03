const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  start: { type: Date, required: true },
  time: { type: String, required: true },
  // Other fields (location, attendees, reminders, etc.)
});

module.exports = mongoose.model("event", eventSchema);
