import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

import Navbar from "./components/layout/Navbar/Navbar";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Navbar />
		</ThemeProvider>
	);
}

export default App;
