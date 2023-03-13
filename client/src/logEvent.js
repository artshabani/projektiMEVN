const axios = require("axios");

async function logEvent(name, action, movie) {
  try {
    const timestamp = Date.now();
    const response = await axios.post("http://localhost:5000/logs", {
      name,
      action,
      movie,
      timestamp,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  logEvent,
};
