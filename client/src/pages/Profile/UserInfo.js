import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const UserInfo = ({ user }) => {
	const classes = useStyles();
	const { name, avatar, bio } = user;
	return (
		<Grid
			container
			direction="row"
			alignItems="center"
			spacing={5}
			className={classes.xsJustifyCenter}
		>
			<Grid item md={3}>
				<Avatar
					alt={name}
					src={avatar}
					style={{ width: "100% ", height: "auto" }}
				></Avatar>
			</Grid>
			<Grid item md="auto">
				<Typography align="left" variant="h4">
					{name}
				</Typography>
				<Typography align="left" variant="overline">
					{bio}
				</Typography>
			</Grid>
		</Grid>
	);
};

UserInfo.propTypes = {
	user: PropTypes.object.isRequired
};

export default React.memo(UserInfo);
