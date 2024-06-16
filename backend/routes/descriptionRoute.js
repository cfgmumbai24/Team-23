const express = require("express");
const {
  generateContentFromImage,
  generateDescription,
} = require("../controller/DescriptionController");
const router = express.Router();

router.post("/generate", generateDescription);

module.exports = router;
