const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true
	},
	email: {
		type: Schema.Types.String,
		required: true
	},
	password: {
		type: Schema.Types.String,
		required: true
	},
	avatar: {
		type: Schema.Types.String
	},
	recipes: {
		type: [Schema.Types.ObjectId],
		ref: "recipes"
	},
	date: {
		type: Schema.Types.String,
		default: Date.now
	},
	admin: {
		type: Schema.Types.Boolean,
		default: false
	}
});

UserSchema.plugin(mongoosePaginate);
module.exports = user = mongoose.model("users", UserSchema);
