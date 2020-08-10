const validator = require("validator");
const isEmpty = require("./is-empty");

const validateAddMealInput = (data, file) => {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";

	if (!validator.contains(file.mimetype, "image")) {
		errors.file =
			"There is a problem with your image. Please try a different one";
	}

	if (validator.isEmpty(data.name)) {
		errors.name = "Meal name is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateAddMealInput;
