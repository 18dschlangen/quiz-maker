const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  questionnumber: Number,
  question: String,
  answer: String,
});
const Question = mongoose.model("question", questionSchema);
module.exports = {
  Question,
};
