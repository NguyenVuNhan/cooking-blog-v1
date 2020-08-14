import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

import Container from "@material-ui/core/Container";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
function App() {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<Navbar />
				<Route exact path="/" component={Landing} />
				<Container maxWidth="sm">
					<Route exact path="/login" component={Login} />
				</Container>{" "}
			</ThemeProvider>
		</Router>
	);
}

export default App;
