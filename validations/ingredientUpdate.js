const validator = require("validator");
const isEmpty = require("./is-empty");

const validateIngredientUpdateInput = (data, file) => {
	let errors = {};

	if (!isEmpty(file) && !validator.contains(file.mimetype, "image")) {
		errors.file =
			"There is a problem with your image. Please try a different one";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateIngredientUpdateInput;
