const express = require("express");
const { uploadBase64Image } = require("../controllers/images");

const router = express.Router();

router.route("/").post(uploadBase64Image);

module.exports = router;
