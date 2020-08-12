const validator = require("validator");
const isEmpty = require("./is-empty");

const validateRecipeAdd = data => {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.course = !isEmpty(data.course) ? data.course : "";

	if (validator.isEmpty(data.name)) {
		errors.name = "Recipe name is required";
	}

	if (validator.isEmpty(data.course)) {
		errors.course = "Recipe course is required";
	}

	if (isEmpty(data.ingredients)) {
		errors.ingredients = "Required at least one ingredient";
	}

	if (isEmpty(data.image)) {
		errors.image = "Recipe image is required";
	}

	if (isEmpty(data.duration)) {
		errors.duration = "Recipe duration is required";
		if (data.duration <= 0) {
			errors.duration = "Duration should not be less or equal than 0";
		}
	}

	if (isEmpty(data.steps)) {
		errors.steps = "Required at least one step";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateRecipeAdd;
