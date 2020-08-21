import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = () => {
	return (
		<Grid
			container
			pt={30}
			component={Box}
			direction="row"
			justify="center"
			alignItems="center"
		>
			<CircularProgress size={60} thickness={5} />
		</Grid>
	);
};

export default Spinner;
