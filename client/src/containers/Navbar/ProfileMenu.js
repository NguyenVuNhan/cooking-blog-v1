import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { logoutRequest } from "reducers/auth/actions";

const ProfileMenu = ({ id, anchorEl, onClose }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const isOpen = Boolean(anchorEl);

	const toProfile = e => {
		history.push("/profile");
		onClose();
	};

	const logout = e => {
		dispatch(logoutRequest(history));
		onClose();
	};

	return (
		<Menu
			anchorEl={anchorEl}
			getContentAnchorEl={null}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			transformOrigin={{ vertical: "top", horizontal: "center" }}
			id={id}
			keepMounted
			open={isOpen}
			onClose={onClose}
		>
			<MenuItem onClick={toProfile}>Profile</MenuItem>
			<MenuItem onClick={logout}>Logout</MenuItem>
		</Menu>
	);
};

ProfileMenu.propTypes = {
	id: PropTypes.string.isRequired,
	anchorEl: PropTypes.object,
	onClose: PropTypes.func.isRequired
};

export default React.memo(ProfileMenu);
