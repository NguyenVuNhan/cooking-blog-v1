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
const validateAddMealInput = require("../../validations/mealAdd.js");
const validateMealUpdateInput = require("../../validations/mealUpdate.js");

// Load models
const Meal = require("../../models/Meal");

// @route 	GET api/meals/meal?mealid=&mealname=
// @desc  	Get meal by id or name
// @access	Public
router.get("/meal", (req, res) => {
	const { mealid, mealname } = req.query;
	let query;

	if (mealid) {
		query = Meal.findById(mealid, {
			_id: 0,
			name: 1,
			"image.link": 1,
			recipes: 1
		});
	} else if (mealname) {
		query = Meal.findOne(
			{ name: { $regex: mealname, $options: "i" } },
			{ _id: 0, name: 1, "image.link": 1, recipes: 1 }
		);
	} else {
		return res.status(400).json({
			noQuery: "Expected userid or username"
		});
	}

	query
		.then(meal => {
			if (!meal) {
				return res.status(404).json({ getMealError: "Meal not found" });
			}
			res.json(meal);
		})
		.catch(errors =>
			res.status(400).json({
				getMealError: "Unexpected error when find meal",
				errors
			})
		);
});

// @route 	GET api/meals/all
// @desc  	Get all available meal
// @access	Public
router.get("/all", (req, res) => {
	Meal.find({}, { _id: 0, name: 1, "image.link": 1, recipes: 1 })
		.then(meals => {
			if (!meals) {
				return res
					.status(404)
					.json({ noMealFound: "There are no meal" });
			}
			res.json(meals);
		})
		.catch(errors =>
			res.status(400).json({
				getMealError: "Unexpected error while get meal",
				errors
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
				accessError: "Access denied. Required admin account"
			});
		}

		const { errors, isValid } = validateMealUpdateInput(req.body, req.file);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Meal.findById(req.params.id)
			.then(meal => {
				if (!meal) {
					return res.json({ mealUploadError: "Meal not found" });
				}

				const updateMeal = {};
				if (!isEmpty(req.body.name) && meal.name !== req.body.name) {
					updateMeal.name = req.body.name;
				}

				if (req.file) {
					return (
						deleteImage(meal.image.deletehash)
							.then(data => uploadImage(req.file))
							.catch(errors =>
								res.status(400).json({
									imageDeleteError:
										"Unable to delete old image",
									errors
								})
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
							.catch(errors =>
								res.status(400).json({
									imageUploadError:
										"Unexpected error while upload new image",
									errors
								})
							)
							// Find and update meal finish
							.then(updatedMeal =>
								res.json({ updatedMeal, succes: true })
							)
							.catch(errors =>
								res.status(404).json({
									mealUpdateError:
										"Unexpected error while update meal",
									errors
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
						.catch(errors =>
							res.status(404).json({
								mealUpdateError:
									"Unexpected error while update meal",
								errors
							})
						);
				}
				return res.json({ meal, succes: true });
			})
			.catch(errors =>
				res.status(404).json({
					mealUpdateError:
						"Unexpected error while searching for meal",
					errors
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
				accessError: "Access denied. Required admin account"
			});
		}

		const { errors, isValid } = validateAddMealInput(req.body, req.file);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const { name } = req.body;

		Meal.findOne({ name })
			.then(meal => {
				if (meal) {
					errors.meal = "Meal name already exist";
					return res.status(400).json(errors);
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
					.catch(errors =>
						res.status(400).json({
							imageUploadError:
								"Unexpected error while upload image",
							errors
						})
					)
					// Meal saved
					.then(meal => res.json({ meal, success: true }))
					.catch(errors =>
						res.status(400).json({
							mealUploadError: "Unexpected error while save meal",
							errors
						})
					);
			})
			.catch(errors =>
				res.json({
					mealUploadError: "Unexpected error while validate meal",
					errors
				})
			);
	}
);

// @route 	GET api/meals/test
// @desc  	Tests users route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "meals works" }));

// @route 	DELETE api/meals/:id
// @desc  	Delete Meal
// @access	Admin
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (!req.user.admin) {
			return res.status(423).json({
				accessError: "Access denied. Required admin account"
			});
		}

		Meal.findById(req.params.id)
			.then(meal => {
				if (!meal) {
					return res
						.status(404)
						.json({ getMealError: "Meal not found" });
				}

				deleteImage(meal.image.deletehash)
					.then(data =>
						Meal.findByIdAndRemove(req.params.id, {
							useFindAndModify: false
						})
					)
					.catch(errors =>
						res.status(400).json({
							imageDeleteError: "Unable to delete old image",
							errors
						})
					)
					// Find and delete meal finish
					.then(deletedMeal =>
						res.json({ deletedMeal, succes: true })
					)
					.catch(errors =>
						res.status(404).json({
							mealDeleteError:
								"Unexpected error while delete meal",
							errors
						})
					);
			})
			.catch(errors =>
				res.status(404).json({
					mealDeleteError:
						"Unexpected error while searching for meal",
					errors
				})
			);
	}
);
module.exports = router;
