import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const TabPanel = ({ children, value, index, ...other }) => {
	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			<Box p={3}>{value === index && children}</Box>
		</Typography>
	);
};

TabPanel.defaultProps = {};

export default TabPanel;
