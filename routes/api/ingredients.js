const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import sevices
const {
	uploadImage,
	deleteImage,
	upload
} = require("../../services/image-uploader");

// Load validation
const isEmpty = require("../../validations/is-empty");
const validateAddIngredientInput = require("../../validations/ingredientAdd");
const validateImage = require("../../validations/image");

// Load models
const Ingredient = require("../../models/Ingredient");

// @route 	GET api/ingredients/test
// @desc  	Tests route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "ingredients works" }));

// @route 	GET api/ingredients
// @desc  	Get all available ingredients
// @access	Public
router.get("/", (req, res) => {
	Ingredient.find({}, { name: 1, "image.link": 1 })
		.then(ingredients => {
			if (!ingredients) {
				return res.status(404).json({
					error: "There are no ingredients",
					success: false
				});
			}
			res.json({ ingredients, success: true });
		})
		.catch(err =>
			res.status(400).json({
				error: "Unexpected error while get meal",
				success: false
			})
		);
});

// @route 	GET api/ingredients/ingredient?id=&name=
// @desc  	Get ingredient by id or name
// @access	Public
router.get("/ingredient", (req, res) => {
	const { id, name } = req.query;
	let query;

	if (id) {
		query = Ingredient.findById(id, {
			name: 1,
			"image.link": 1
		});
	} else if (name) {
		query = Ingredient.findOne(
			{ name: { $regex: name, $options: "i" } },
			{ name: 1, "image.link": 1 }
		);
	} else {
		return res.status(400).json({
			error: "Expected id or name",
			success: false
		});
	}

	query
		.then(ingredient => {
			if (!ingredient) {
				return res
					.status(404)
					.json({ error: "Meal not found", success: false });
			}
			res.json({ ingredient, success: true });
		})
		.catch(err =>
			res.status(400).json({
				error: "Unexpected error when find meal",
				success: false
			})
		);
});

// @route 	POST api/ingredients/:id
// @desc  	Update Ingredient
// @access	Admin
router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	upload,
	(req, res) => {
		if (!req.user.admin) {
			return res.status(423).json({
				error: "Access denied. Required admin account",
				success: false
			});
		}

		const { errors, isValid } = validateImage(req.file);
		if (!isValid) {
			return res.status(400).json({ errors, success: false });
		}

		Ingredient.findById(req.params.id)
			.then(ingredient => {
				if (!ingredient) {
					return res.json({
						error: "Ingredient not found",
						success: false
					});
				}

				const updateIngedient = {};
				if (
					!isEmpty(req.body.name) &&
					ingredient.name !== req.body.name
				) {
					updateIngedient.name = req.body.name;
				}

				if (req.file) {
					return (
						deleteImage(ingredient.image.deletehash)
							.then(data => uploadImage(req.file))
							.catch(errors =>
								console.log(
									"Unexpected error when delete old image"
								)
							)
							// Upload new image finish
							.then(newImage => {
								const { deletehash, link } = newImage.data.data;
								updateIngedient.image = {
									link,
									deletehash
								};

								return Ingredient.findByIdAndUpdate(
									req.params.id,
									{ $set: updateIngedient },
									{ new: true, useFindAndModify: false }
								);
							})
							.catch(errors =>
								console.log(
									"Unexpected error when upload new image"
								)
							)
							// Find and update meal finish
							.then(updatedIngedient =>
								res.json({ updatedIngedient, succes: true })
							)
							.catch(err =>
								res.status(404).json({
									error:
										"Unexpected error while update ingredient",
									success: false
								})
							)
					);
				} else if (!isEmpty(updateIngedient)) {
					return Ingredient.findByIdAndUpdate(
						req.params.id,
						{ $set: updateIngedient },
						{ new: true, useFindAndModify: false }
					)
						.then(updatedIngedient =>
							res.json({ updatedIngedient, succes: true })
						)
						.catch(err =>
							res.status(404).json({
								error:
									"Unexpected error while update ingredient",
								success: false
							})
						);
				}
				return res.json({ ingredient, succes: true });
			})
			.catch(err =>
				res.status(404).json({
					error: "Unexpected error while searching for ingredient",
					status: false
				})
			);
	}
);

// @route 	POST api/ingredients
// @desc  	Add New Ingredient
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

		const { errors, isValid } = validateAddIngredientInput(
			req.body,
			req.file
		);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const { name } = req.body;

		Ingredient.findOne({ name })
			.then(ingredient => {
				if (ingredient) {
					errors.ingredient = "Ingredient name already exist";
					return res.status(400).json({ errors, success: false });
				}

				uploadImage(req.file)
					.then(data => {
						const { deletehash, link } = data.data.data;
						const newIngredient = new Ingredient({
							name,
							image: {
								link,
								deletehash
							}
						});

						return newIngredient.save();
					})
					.catch(err =>
						console.log("Unexpected error while upload image")
					)
					// Ingredient saved
					.then(savedIngredient =>
						res.json({ savedIngredient, success: true })
					)
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

// @route 	DELETE api/ingredients/:id
// @desc  	Delete Ingredient
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

		Ingredient.findById(req.params.id)
			.then(ingredient => {
				if (!ingredient) {
					return res
						.status(404)
						.json({ error: "Meal not found", success: false });
				}

				deleteImage(ingredient.image.deletehash)
					.then(data =>
						Ingredient.findByIdAndRemove(req.params.id, {
							useFindAndModify: false
						})
					)
					.catch(errors => console.log("Unable to delete old image"))
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
