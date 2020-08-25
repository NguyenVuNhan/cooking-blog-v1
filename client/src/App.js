import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";

const NotFound = lazy(() => import("./components/NotFound"));
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const AddRecipe = lazy(() => import("./pages/AddRecipe"));
const EditRecipe = lazy(() => import("./pages/EditRecipe"));

function App() {
	return (
		<Suspense fallback={<Spinner />}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<PrivateRoute exact path="/profile" component={Profile} />
					<PrivateRoute
						exact
						path="/profile/add-recipe"
						component={AddRecipe}
					/>
					<PrivateRoute
						exact
						path="/profile/edit-recipe"
						component={EditRecipe}
					/>
					<Route component={NotFound} />
				</Switch>
			</Router>
		</Suspense>
	);
}

export default App;
