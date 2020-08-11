const express = require("express");

// import routes
const users = require("./api/users");
const meals = require("./api/meals");
const ingredients = require("./api/ingredients");
const recipes = require("./api/recipes");

module.exports = function(app) {
	// Test api
	app.get("/test", (req, res) => {
		res.send("Cooking Blog test");
	});

	// Routes
	app.use("/api/users", users);
	app.use("/api/meals", meals);
	app.use("/api/ingredients", ingredients);
	app.use("/api/recipes", recipes);
};
