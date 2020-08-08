const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// import routes
const users = require("./routes/api/users");

// Create express app
const app = express();

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// Database conection
const db = require("./config/keys").mongoUrl;
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Database Connected"))
	.catch(err => console.log(err));

// Test api
app.get("/test", (req, res) => {
	res.send("Cooking Blog test");
});

// Routes
app.use("/api/users", users);

// Server static
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
