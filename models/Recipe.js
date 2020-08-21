const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const RecipeSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
		required: true
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: "courses",
		required: true
	},
	ingredients: [
		{
			ingredient: {
				type: Schema.Types.ObjectId,
				ref: "ingredients"
			},
			name: {
				type: Schema.Types.String,
				required: true
			},
			quantity: {
				type: Schema.Types.String,
				required: true
			}
		}
	],
	image: {
		link: {
			type: Schema.Types.String,
			required: true
		},
		deletehash: {
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
				deletehash: {
					type: Schema.Types.String,
					required: true
				}
			}
		}
	],
	date: {
		type: Schema.Types.Date,
		default: Date.now
	}
});

module.exports = recipe = mongoose.model("recipes", RecipeSchema);
