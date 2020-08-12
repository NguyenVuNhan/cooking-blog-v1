const express = require("express");

// import routes
const users = require("./api/users");
const courses = require("./api/courses");
const ingredients = require("./api/ingredients");
const recipes = require("./api/recipes");
const images = require("./api/images");

module.exports = function(app) {
	// Test api
	app.get("/test", (req, res) => {
		res.send("Cooking Blog test");
	});

	// Routes
	app.use("/api/users", users);
	app.use("/api/courses", courses);
	app.use("/api/ingredients", ingredients);
	app.use("/api/recipes", recipes);
	app.use("/api/images", images);
};
