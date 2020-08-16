import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const UserInfo = ({ user }) => {
	return (
		<Grid container>
			<Grid item styles={{ width: "100%", height: "auto" }} xs={2}>
				<Avatar alt={user.name} src={user.avatar}></Avatar>
			</Grid>
			<Grid>HASDASDASDASDASDASD</Grid>
		</Grid>
	);
};

UserInfo.defaultProps = {};

UserInfo.propTypes = {
	user: PropTypes.object.isRequired
};

export default UserInfo;
