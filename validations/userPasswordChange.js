const validator = require("validator");
const isEmpty = require("./is-empty");

const validatePasswordChangeInput = data => {
	let errors = {};

	data.password = !isEmpty(data.password) ? data.password : "";
	data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
	data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : "";

	if (validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	}

	if (!validator.isLength(data.newPassword, { min: 6, max: 30 })) {
		errors.newPassword = "Password must be between 2 and 30 character";
	}

	if (!validator.isLength(data.newPassword2, { min: 6, max: 30 })) {
		errors.newPassword2 = "Password must be between 2 and 30 character";
	}

	if (validator.isEmpty(data.newPassword)) {
		errors.newPassword = "Password is required";
	}

	if (validator.isEmpty(data.newPassword2)) {
		errors.newPassword2 = "Password is required";
	}

	if (!validator.equals(data.newPassword, data.newPassword2)) {
		errors.newPassword2 = "Password must match";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validatePasswordChangeInput;
