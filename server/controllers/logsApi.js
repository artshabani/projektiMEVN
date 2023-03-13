const Log = require("../models/logs");

module.exports = class API {
  //fetch all movies
  static async fetchAllLogs(req, res) {
    try {
      const logs = await Log.find();
      res.status(200).json(logs);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async createLog(req, res) {
    const logs = req.body;
    try {
      await Log.create(logs);
      res.status(201).json({ message: "Log created successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async fetchLogById(req, res) {
    const id = req.params.id;
    try {
      const logs = await Log.findById(id);
      res.status(200).json(logs);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
