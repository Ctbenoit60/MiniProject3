const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: { type: String, trim: true, required: true },
  emailId: { type: String, trim: true, required: true, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  backgroundURL: {type: String, default: "https://w.wallhaven.cc/full/zy/wallhaven-zyo11j.jpg" },
});

module.exports = mongoose.model("user", userSchema);
