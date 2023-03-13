const mongoose = require("mongoose");

const logsSchema = mongoose.Schema({
  name: String,
  action: String,
  movie: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", logsSchema);
