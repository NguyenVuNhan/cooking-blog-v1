import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const NotFound = () => {
	return (
		<Container maxWidth="sm">
			<Typography variant="h1" align="center" style={{ marginTop: 80 }}>
				NOT FOUND
			</Typography>
		</Container>
	);
};

NotFound.defaultProps = {};

export default NotFound;
