const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

// Import sevices
const {
	uploadImage,
	deleteImage,
	upload
} = require("../../services/image-uploader");

// Load models
const Recipe = require("../../models/Recipe");

// @route 	GET api/meals/test
// @desc  	Tests route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "recipes works" }));

module.exports = router;
