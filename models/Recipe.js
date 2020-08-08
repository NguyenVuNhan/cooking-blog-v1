const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const RecipeSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true
	},
	meal: {
		type: Schema.Types.ObjectId,
		ref: "meals",
		required: true
	},
	ingredients: [
		{
			ingredient: {
				type: Schema.Types.ObjectId,
				ref: "ingredients"
			},
			quantity: {
				type: Schema.Types.Number,
				required: true
			}
		}
	],
	picture: {
		type: Schema.Types.String,
		required: false
	},
	duration: {
		type: Schema.Types.Number,
		required: true
	},
	steps: [
		{
			description: {
				type: Schema.Types.String,
				required: true
			},
			duration: {
				type: Schema.Types.Number,
				required: false,
				default: -1
			},
			picture: {
				type: Schema.Types.String,
				required: false
			}
		}
	]
});

module.exports = recipe = mongoose.model("recipes", RecipeSchema);
