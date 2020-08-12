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
const validateAddCourseInput = require("../../validations/courseAdd");
const validateImage = require("../../validations/image");

// Load models
const Course = require("../../models/Course");

// @route 	GET api/courses/test
// @desc  	Tests route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "courses works" }));

// @route 	GET api/courses
// @desc  	Get all available course
// @access	Public
router.get("/", (req, res) => {
	Course.find({}, { name: 1, "image.link": 1 })
		.then(courses => {
			if (!courses) {
				return res
					.status(404)
					.json({ error: "There are no course", success: false });
			}
			res.json({ courses, success: true });
		})
		.catch(err =>
			res.status(400).json({
				error: "Unexpected error while get course",
				success: false
			})
		);
});

// @route 	GET api/courses/course?id=&name=
// @desc  	Get course by id or name
// @access	Public
router.get("/course", (req, res) => {
	const { id, name } = req.query;
	let query;

	if (id) {
		query = Course.findById(id, { name: 1, "image.link": 1 });
	} else if (name) {
		query = Course.findOne(
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
		.then(course => {
			if (!course) {
				return res
					.status(404)
					.json({ error: "Course not found", success: false });
			}
			res.json({ course, success: true });
		})
		.catch(errors =>
			res.status(400).json({
				error: "Unexpected error when find course",
				success: false
			})
		);
});

// @route 	POST api/courses/:id
// @desc  	Update Course with deletehash
// @access	Admin
router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	upload,
	(req, res) => {
		if (!req.user.admin) {
			return res.status(423).json({
				error: "Access denied. Required admin account"
			});
		}

		const { errors, isValid } = validateImage(req.body, req.file);
		if (!isValid) {
			return res.status(400).json({ errors, success: false });
		}

		Course.findById(req.params.id)
			.then(course => {
				if (!course) {
					return res.json({
						error: "Course not found",
						success: false
					});
				}

				const updateCourse = {};
				if (!isEmpty(req.body.name) && course.name !== req.body.name) {
					updateCourse.name = req.body.name;
				}

				if (req.file) {
					return (
						deleteImage(course.image.deletehash)
							.then(data => uploadImage(req.file))
							.catch(err =>
								console.log("Unable to delete old image")
							)
							// Upload new image finish
							.then(newImage => {
								const { deletehash, link } = newImage.data.data;
								updateCourse.image = {
									link,
									deletehash
								};

								return Course.findByIdAndUpdate(
									req.params.id,
									{ $set: updateCourse },
									{ new: true, useFindAndModify: false }
								);
							})
							.catch(err =>
								console.log(
									"Unexpected error while upload new image"
								)
							)
							// Find and update course finish
							.then(updatedCourse =>
								res.json({ updatedCourse, succes: true })
							)
							.catch(err =>
								res.status(400).json({
									error:
										"Unexpected error while update course",
									success: false
								})
							)
					);
				} else if (!isEmpty(updateCourse)) {
					return Course.findByIdAndUpdate(
						req.params.id,
						{ $set: updateCourse },
						{ new: true, useFindAndModify: false }
					)
						.then(updateCourse =>
							res.json({ updateCourse, succes: true })
						)
						.catch(err =>
							res.status(404).json({
								error: "Unexpected error while update course",
								success: false
							})
						);
				}
				return res.json({ course, succes: true });
			})
			.catch(err =>
				res.status(404).json({
					error: "Unexpected error while searching for course",
					success: false
				})
			);
	}
);

// @route 	POST api/courses
// @desc  	Add New Course
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

		const { errors, isValid } = validateAddCourseInput(req.body, req.file);
		if (!isValid) {
			return res.status(400).json({ errors, success: false });
		}

		const { name } = req.body;

		Course.findOne({ name })
			.then(course => {
				if (course) {
					return res.status(400).json({
						error: "Course name already exist",
						success: false
					});
				}

				uploadImage(req.file)
					.then(data => {
						const { deletehash, link } = data.data.data;
						const newCourse = new Course({
							name,
							image: {
								link,
								deletehash
							}
						});

						newCourse
							.save()
							.then(savedCourse =>
								res.json({ savedCourse, success: true })
							)
							.catch(err =>
								res.status(400).json({
									error: "Unexpected error while save course",
									success: false
								})
							);
					})
					.catch(err =>
						res.status(400).json({
							error: "Unexpected error while upload image",
							success: false
						})
					);
			})
			.catch(err =>
				res.status(400).json({
					error: "Unexpected error while validate course",
					success: false
				})
			);
	}
);

// @route 	DELETE api/courses/:id
// @desc  	Delete Course
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

		Course.findById(req.params.id)
			.then(course => {
				if (!course) {
					return res
						.status(404)
						.json({ error: "Course not found", success: false });
				}

				deleteImage(course.image.deletehash)
					.then(data => {
						Course.findByIdAndRemove(req.params.id, {
							useFindAndModify: false
						})
							.then(deletedCourse =>
								res.json({ deletedCourse, succes: true })
							)
							.catch(err =>
								res.status(404).json({
									error: "Course not found",
									success: false
								})
							);
					})
					.catch(err =>
						res.status(400).json({
							error: "Unable to delete old image",
							success: false
						})
					);
			})
			.catch(err =>
				res.status(404).json({
					error: "Unexpected error while searching for course",
					success: false
				})
			);
	}
);
module.exports = router;
