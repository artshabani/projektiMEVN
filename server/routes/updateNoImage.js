const express = require("express");
const router = express.Router();
const API = require("../controllers/api");

router.patch("/:id", API.updateMovieNoImage);

module.exports = router;
