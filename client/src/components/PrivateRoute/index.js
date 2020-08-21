import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import NotFound from "../NotFound";

const PrivateRoute = ({ component: Component, adminOnly, ...rest }) => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const admin = useSelector(state => state.auth.user.admin);
	const isPrivate = isAuthenticated && ((adminOnly && admin) || !adminOnly);

	return (
		<Route
			{...rest}
			render={props =>
				isPrivate ? <Component {...props} /> : <NotFound />
			}
		/>
	);
};

PrivateRoute.defaultProps = {
	adminOnly: false
};

export default PrivateRoute;
