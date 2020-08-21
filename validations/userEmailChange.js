const validator = require("validator");
const isEmpty = require("./is-empty");

const validateEmailChangeInput = data => {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : "";

	if (validator.isEmpty(data.email)) {
		errors.email = "Email is required";
	}

	if (!validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateEmailChangeInput;
