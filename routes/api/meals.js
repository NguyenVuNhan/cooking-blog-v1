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

// Load validation
const isEmpty = require("../../validations/is-empty");
const validateAddMealInput = require("../../validations/mealAdd");
const validateMealUpdateInput = require("../../validations/mealUpdate");

// Load models
const Meal = require("../../models/Meal");

// @route 	GET api/meals/test
// @desc  	Tests route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "meals works" }));

// @route 	GET api/meals/meal?id=&name=
// @desc  	Get meal by id or name
// @access	Public
router.get("/meal", (req, res) => {
	const { id, name } = req.query;
	let query;

	if (id) {
		query = Meal.findById(id, { name: 1, "image.link": 1, recipes: 1 });
	} else if (name) {
		query = Meal.findOne(
			{ name: { $regex: name, $options: "i" } },
			{ name: 1, "image.link": 1, recipes: 1 }
		);
	} else {
		return res.status(400).json({
			error: "Expected id or name",
			success: false
		});
	}

	query
		.then(meal => {
			if (!meal) {
				return res
					.status(404)
					.json({ error: "Meal not found", success: false });
			}
			res.json({ meal, success: true });
		})
		.catch(errors =>
			res.status(400).json({
				error: "Unexpected error when find meal",
				success: false
			})
		);
});

// @route 	GET api/meals/all
// @desc  	Get all available meal
// @access	Public
router.get("/all", (req, res) => {
	Meal.find({}, { name: 1, "image.link": 1, recipes: 1 })
		.then(meals => {
			if (!meals) {
				return res
					.status(404)
					.json({ error: "There are no meal", success: false });
			}
			res.json({ meal, success: true });
		})
		.catch(err =>
			res.status(400).json({
				error: "Unexpected error while get meal",
				success: false
			})
		);
});

// @route 	POST api/meals/:id
// @desc  	Update Meal with deletehash
// @access	Admin
router.post(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	upload,
	(req, res) => {
		if (!req.user.admin) {
			return res.status(423).json({
				error: "Access denied. Required admin account"
			});
		}

		const { errors, isValid } = validateMealUpdateInput(req.body, req.file);
		if (!isValid) {
			return res.status(400).json({ errors, success: false });
		}

		Meal.findById(req.params.id)
			.then(meal => {
				if (!meal) {
					return res.json({
						error: "Meal not found",
						success: false
					});
				}

				const updateMeal = {};
				if (!isEmpty(req.body.name) && meal.name !== req.body.name) {
					updateMeal.name = req.body.name;
				}

				if (req.file) {
					return (
						deleteImage(meal.image.deletehash)
							.then(data => uploadImage(req.file))
							.catch(err =>
								console.log("Unable to delete old image")
							)
							// Upload new image finish
							.then(newImage => {
								const { deletehash, link } = newImage.data.data;
								updateMeal.image = {
									link,
									deletehash
								};

								return Meal.findByIdAndUpdate(
									req.params.id,
									{ $set: updateMeal },
									{ new: true, useFindAndModify: false }
								);
							})
							.catch(err =>
								console.log(
									"Unexpected error while upload new image"
								)
							)
							// Find and update meal finish
							.then(updatedMeal =>
								res.json({ updatedMeal, succes: true })
							)
							.catch(err =>
								res.status(400).json({
									error: "Unexpected error while update meal",
									success: false
								})
							)
					);
				} else if (!isEmpty(updateMeal)) {
					return Meal.findByIdAndUpdate(
						req.params.id,
						{ $set: updateMeal },
						{ new: true, useFindAndModify: false }
					)
						.then(updatedMeal =>
							res.json({ updatedMeal, succes: true })
						)
						.catch(err =>
							res.status(404).json({
								error: "Unexpected error while update meal",
								success: false
							})
						);
				}
				return res.json({ updatedMeal, succes: true });
			})
			.catch(err =>
				res.status(404).json({
					error: "Unexpected error while searching for meal",
					success: false
				})
			);
	}
);

// @route 	POST api/meals
// @desc  	Add New Meal
// @access	Admin
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	upload,
	(req, res) => {
		if (!req.user.admin) {
			return res.status(423).json({
				error: "Access denied. Required admin account",
				success: false
			});
		}

		const { errors, isValid } = validateAddMealInput(req.body, req.file);
		if (!isValid) {
			return res.status(400).json({ errors, success: false });
		}

		const { name } = req.body;

		Meal.findOne({ name })
			.then(meal => {
				if (meal) {
					errors.meal = "Meal name already exist";
					return res.status(400).json({ errors, success: false });
				}

				uploadImage(req.file)
					.then(data => {
						const { deletehash, link } = data.data.data;
						const newMeal = new Meal({
							name,
							image: {
								link,
								deletehash
							}
						});

						return newMeal.save();
					})
					.catch(err =>
						res.status(400).json({
							error: "Unexpected error while upload image",
							success: false
						})
					)
					// Meal saved
					.then(savedMeal => res.json({ savedMeal, success: true }))
					.catch(err =>
						res.status(400).json({
							error: "Unexpected error while save meal",
							success: false
						})
					);
			})
			.catch(err =>
				res.json({
					error: "Unexpected error while validate meal",
					success: false
				})
			);
	}
);

// @route 	DELETE api/meals/:id
// @desc  	Delete Meal
// @access	Admin
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (!req.user.admin) {
			return res.status(423).json({
				error: "Access denied. Required admin account",
				success: false
			});
		}

		Meal.findById(req.params.id)
			.then(meal => {
				if (!meal) {
					return res
						.status(404)
						.json({ error: "Meal not found", success: false });
				}

				deleteImage(meal.image.deletehash)
					.then(data =>
						Meal.findByIdAndRemove(req.params.id, {
							useFindAndModify: false
						})
					)
					.catch(err => console.log("Unable to delete old image"))
					// Find and delete meal finish
					.then(deletedMeal =>
						res.json({ deletedMeal, succes: true })
					)
					.catch(err =>
						res.status(404).json({
							error: "Unexpected error while delete meal",
							success: false
						})
					);
			})
			.catch(err =>
				res.status(404).json({
					error: "Unexpected error while searching for meal",
					success: false
				})
			);
	}
);
module.exports = router;
