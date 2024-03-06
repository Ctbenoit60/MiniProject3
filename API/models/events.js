const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  id: { type: Number},
  title: { type: String, required: true },
  description: { type: String },
  start: { type: Date, required: true },
  // Other fields (location, attendees, reminders, etc.)
});

module.exports = mongoose.model("event", eventSchema);
