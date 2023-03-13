const express = require("express");
const router = express.Router();
const API = require("../controllers/logsApi");

router.get("/", API.fetchAllLogs);
router.get("/:id", API.fetchLogById);
router.post("/", API.createLog);

module.exports = router;
