const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const MealsSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true
	},
	picture: {
		type: Schema.Types.String,
		required: false
	},
	recipes: [
		{
			type: Schema.Types.ObjectId,
			ref: "recipes"
		}
	]
});

module.exports = meal = mongoose.model("meals", MealsSchema);
