import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/layout/Landing/Landing";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			<Landing />
		</ThemeProvider>
	);
}

export default App;
