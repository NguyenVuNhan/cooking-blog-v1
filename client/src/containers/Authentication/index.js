import React, { lazy } from "react";
import { Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));

const Authentication = () => {
	return (
		<React.Fragment>
			<Container maxWidth="sm">
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</Container>
		</React.Fragment>
	);
};

export default Authentication;
