const express = require("express");

// import routes
const users = require("./api/users");
const meals = require("./api/meals");

module.exports = function(app) {
	// Test api
	app.get("/test", (req, res) => {
		res.send("Cooking Blog test");
	});

	// Routes
	app.use("/api/users", users);
	app.use("/api/meals", meals);
};
