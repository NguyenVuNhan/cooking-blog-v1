const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const IngredientSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true
	},
	image: {
		link: {
			type: Schema.Types.String,
			required: true
		},
		deleteHash: {
			type: Schema.Types.String,
			required: true
		}
	},
	recipes: [
		{
			type: Schema.Types.ObjectId,
			ref: "recipes"
		}
	]
});

module.exports = ingredient = mongoose.model("ingredients", IngredientSchema);
