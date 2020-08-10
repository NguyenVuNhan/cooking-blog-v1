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
			image: {
				link: {
					type: Schema.Types.String,
					required: true
				},
				deleteHash: {
					type: Schema.Types.String,
					required: true
				}
			}
		}
	]
});

module.exports = recipe = mongoose.model("recipes", RecipeSchema);
