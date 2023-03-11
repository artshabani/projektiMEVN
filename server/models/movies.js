const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  created: {
    type: Date,
    default: Date.now,
  },
  viewcount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
