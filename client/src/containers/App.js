import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "components/PrivateRoute";
import Spinner from "components/Spinner";
import Navbar from "./Navbar";

const NotFound = lazy(() => import("components/NotFound"));
const Landing = lazy(() => import("./Landing"));
const Authentication = lazy(() => import("./Authentication"));
const Profile = lazy(() => import("./Profile"));

function App() {
	return (
		<Suspense fallback={<Spinner />}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Landing} />
					<PrivateRoute exact path="/profile" component={Profile} />
					<Authentication />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</Suspense>
	);
}

export default App;
