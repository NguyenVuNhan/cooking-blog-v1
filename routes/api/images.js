const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import services
const { uploadImage, upload } = require("../../services/image-uploader");

// Import validators
const validateImage = require("../../validations/image");

// @route 	POST api/images/
// @desc  	Upload new image
// @access	Public
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	upload,
	(req, res) => {
		console.log(req);
		const { errors, isValid } = validateImage(req.file);
		if (!isValid) {
			return res.status(400).json({ errors, success: false });
		}

		uploadImage(req.file)
			.then(newImage =>
				res.json({
					image: {
						link: newImage.data.data.link,
						deletehash: newImage.data.data.deletehash
					},
					success: true
				})
			)
			.catch(err =>
				res.status(400).json({
					error: "Unexpected error while upload new image",
					success: false
				})
			);
	}
);

module.exports = router;
