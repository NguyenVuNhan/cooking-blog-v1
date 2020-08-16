const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load validators
const validateRegisterInput = require("../../validations/userRegister");
const validateLoginInput = require("../../validations/userLogin");
const validatePasswordChangeInput = require("../../validations/userPasswordChange");
const validateEmailChangeInput = require("../../validations/userEmailChange");

// Load models
const User = require("../../models/User");

// @route 	GET api/users/test
// @desc  	Tests users route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

// @route 	GET api/users
// @desc  	Get all users
// @access	Public
router.get("/", (req, res) => {
	User.find()
		.then(users => {
			if (!users) {
				return res.status(404).json({
					error: "No User Found",
					success: false
				});
			}
			res.json({ users, success: true });
		})
		.catch(err =>
			res.status(404).json({
				error: "Unexpected error when find user",
				success: false
			})
		);
});

// @route 	GET api/users/recipes?id=&name=&page=&limit=
// @desc  	Get current user recipes by id or name
// @access	Public
router.get("/recipes", (req, res) => {
	const { id, name, page, limit } = req.query;
	let query;

	if (id) {
		query = User.findById(id);
	} else if (name) {
		query = User.findOne({ name: { $regex: name, $options: "i" } });
	} else {
		return res.status(400).json({
			error: "Expected id or name",
			success: false
		});
	}

	query
		.then(user => {
			if (!user) {
				return res.status(404).json({
					error: "User Not Found",
					success: false
				});
			}
			res.json({ recipes: user.recipes, success: true });
		})
		.catch(err =>
			res.status(404).json({
				error: "Unexpected error when find user",
				success: false
			})
		);
});

// @route 	POST api/users/email
// @desc  	Change email of current user
// @access	Private
router.put(
	"/email",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { password, email } = req.body;
		const { errors, isValid } = validateEmailChangeInput(req.body);

		if (!isValid) {
			return res.status(400).json({ errors, success: false });
		}

		User.findByIdAndUpdate(
			req.user.id,
			{ $set: { email } },
			{ new: true, useFindAndModify: false }
		)
			.then(updatedUser => {
				res.json({ updatedUser, success: true });
			})
			.catch(err =>
				res.status(404).json({
					error: "Unexpected error when update user email",
					success: false
				})
			);
	}
);

// @route 	POST api/users/password
// @desc  	Change password of current user
// @access	Private
router.put(
	"/password",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { password, newPassword, newPassword2 } = req.body;
		const { errors, isValid } = validatePasswordChangeInput(req.body);

		if (!isValid) {
			return res.status(400).json({ errors, success: false });
		}

		// Check for password matched
		bcrypt.compare(password, req.user.password).then(isMatch => {
			if (isMatch) {
				// Hash new password
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newPassword, salt, (err, hash) => {
						res.status(400).json({
							error: "Unable to hash password",
							success: false
						});

						// Update new password
						User.findByIdAndUpdate(
							req.user.id,
							{ $set: { password: hash } },
							{ new: true, useFindAndModify: false }
						)
							.then(user => res.json({ user, success: true }))
							.catch(err =>
								res.json({
									error: "Unable to find this user",
									success: false
								})
							);
					});
				});
			} else {
				errors.password = "Password incorrect";
				return res.status(400).json({ errors, success: false });
			}
		});
	}
);

// @route 	DELETE api/users
// @desc  	Delete current user
// @access	Private
router.delete(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		User.findByIdAndRemove(req.user.id, { useFindAndModify: false })
			.then(deletedUser => res.json({ deletedUser, success: true }))
			.catch(err =>
				res.status(404).json({
					error: "Unable to find this user",
					success: false
				})
			);
	}
);

// @route 	GET api/users/current
// @desc  	Return current user
// @access	Private
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email
		});
	}
);

// @route 	POST api/users/login
// @desc  	Login user
// @access	Public
router.post("/login", (req, res) => {
	const { email, password } = req.body;
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json({ errors, success: false });
	}

	User.findOne({ email: email }).then(user => {
		if (!user) {
			errors.email = "User not found";
			return res.status(400).json({ errors, success: false });
		}

		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// Create JWT payload
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar,
					admin: user.admin
				};

				// Generate token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							token: "Bearer " + token,
							success: true
						});
					}
				);
			} else {
				errors.password = "Password incorrect";
				return res.status(400).json({ errors, success: false });
			}
		});
	});
});

// @route 	POST api/users/register
// @desc  	Register user
// @access	Public
router.post("/register", (req, res) => {
	const { name, email, password } = req.body;
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json({ errors, success: false });
	}

	User.findOne({ email: email }).then(user => {
		if (user) {
			errors.email = "Email already exists";
			return res.status(400).json({ errors, success: false });
		} else {
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm"
			});

			const newUser = new User({
				name: name,
				email: email,
				avatar,
				password: password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(updatedUser =>
							res.json({ updatedUser, success: true })
						)
						.catch(err =>
							res.status(400).json({
								error: "Unexpected error while save user",
								success: false
							})
						);
				});
			});
		}
	});
});

module.exports = router;
