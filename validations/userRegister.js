const validator = require("validator");
const isEmpty = require("./is-empty");

const validateRegisterInput = data => {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if (!validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = "Name must be between 2 and 30 character";
	}

	if (validator.isEmpty(data.name)) {
		errors.name = "Name fields is required";
	}

	if (validator.isEmpty(data.email)) {
		errors.email = "Email is required";
	}

	if (!validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	if (!validator.equals(data.password, data.password2)) {
		errors.password2 = "Password must match";
	}

	if (validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	}

	if (validator.isEmpty(data.password2)) {
		errors.password2 = "Missing password confirmation";
	}

	if (!validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be between 6 and 30 character";
	}

	if (!validator.isLength(data.password2, { min: 6, max: 30 })) {
		errors.password2 = "Password must be between 6 and 30 character";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateRegisterInput;
