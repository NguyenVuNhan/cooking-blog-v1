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

// @route 	GET api/users/recipes?userid=&username=&page=&limit=
// @desc  	Get current user recipes by id or username
// @access	Public
router.get("/recipes", (req, res) => {
	const { userid, username, page, limit } = req.query;
	let query;

	if (userid) {
		query = User.findById(userid);
	} else if (username) {
		query = User.findOne({ name: { $regex: username, $options: "i" } });
	} else {
		return res.status(400).json({
			noQuery: "Expected userid or username"
		});
	}

	query
		.then(user => {
			if (!user) {
				return res
					.status(404)
					.json({ findUserError: "User not found" });
			}
			res.json(user.recipes);
		})
		.catch(errors =>
			res.status(400).json({
				findUserError: "Unexpected error when find user",
				errors
			})
		);
});

// @route 	POST api/users/email
// @desc  	Change email of current user
// @access	Private
router.post(
	"/email",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { password, email } = req.body;
		const { errors, isValid } = validateEmailChangeInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		User.findByIdAndUpdate(
			req.user.id,
			{ $set: { email } },
			{ new: true, useFindAndModify: false }
		)
			.then(updatedUser => {
				res.json({ updatedUser, success: true });
			})
			.catch(errors =>
				res.status(404).json({
					noUserFound: "Unexpected error when update email",
					errors
				})
			);
	}
);

// @route 	POST api/users/password
// @desc  	Change password of current user
// @access	Private
router.post(
	"/password",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { password, newPassword, newPassword2 } = req.body;
		const { errors, isValid } = validatePasswordChangeInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		// Check for password matched
		bcrypt.compare(password, req.user.password).then(isMatch => {
			if (isMatch) {
				// Hash new password
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newPassword, salt, (err, hash) => {
						if (err) throw err;

						// Update new password
						User.findByIdAndUpdate(
							req.user.id,
							{ $set: { password: hash } },
							{ new: true, useFindAndModify: false }
						)
							.then(user => res.json({ user, success: true }))
							.catch(errors =>
								res.json({
									updatePasswordError:
										"Unable to find this user",
									errors
								})
							);
					});
				});
			} else {
				errors.password = "Password incorrect";
				return res.status(400).json(errors);
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
			.then(deleteUser => res.json({ deleteUser, success: true }))
			.catch(errors =>
				res.status(404).json({
					noUserFound: "Unable to find this user",
					errors
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
		return res.status(400).json(errors);
	}

	User.findOne({ email: email }).then(user => {
		if (!user) {
			errors.email = "User not found";
			return res.status(400).json(errors);
		}

		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// Create JWT payload
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};

				// Generate token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			} else {
				errors.password = "Password incorrect";
				return res.status(400).json(errors);
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
		return res.status(400).json(errors);
	}

	User.findOne({ email: email }).then(user => {
		if (user) {
			errors.email = "Email already exists";
			return res.status(400).json(errors);
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
						.then(user => res.json(user))
						.catch(errors =>
							console.log({
								addUserErrors:
									"Unexpected error while save user",
								errors
							})
						);
				});
			});
		}
	});
});

// @route 	GET api/users/test
// @desc  	Tests users route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

module.exports = router;
