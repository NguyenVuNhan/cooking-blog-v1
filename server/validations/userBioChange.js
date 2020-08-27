const validator = require("validator");
const isEmpty = require("./is-empty");

const validateBioChangeInput = data => {
	let errors = {};

	data.bio = !isEmpty(data.bio) ? data.bio : "";

	if (validator.isEmpty(data.bio)) {
		errors.bio = "Bio is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateBioChangeInput;
