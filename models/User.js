const mongoose = require("mongoose");
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
	date: {
		type: Schema.Types.String,
		default: Date.now
	},
	admin: {
		type: Schema.Types.Boolean,
		default: false
	}
});

module.exports = user = mongoose.model("users", UserSchema);
