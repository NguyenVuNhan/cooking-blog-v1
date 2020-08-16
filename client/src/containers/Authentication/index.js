import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Authentication = () => {
	return (
		<React.Fragment>
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
		</React.Fragment>
	);
};

export default Authentication;
