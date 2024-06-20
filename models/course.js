const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  imageLink: { type: String, required: true },
  published: { type: Boolean, default: false },
});
module.exports = mongoose.model("Course", CourseSchema);
