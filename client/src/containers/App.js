import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Container from "@material-ui/core/Container";
import NotFound from "components/NotFound";
import PrivateRoute from "components/PrivateRoute";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Authentication from "./Authentication";
import Profile from "./Profile";

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Landing} />
				<React.Fragment>
					<Container maxWidth="sm">
						<Authentication />
						<PrivateRoute
							exact
							path="/profile"
							component={Profile}
						/>
					</Container>
				</React.Fragment>
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
}

export default App;
