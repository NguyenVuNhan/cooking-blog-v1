import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";

const MobileMenu = ({ id, anchorEl, onClose, children }) => {
	const isOpen = Boolean(anchorEl);

	return (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={id}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isOpen}
			onClose={onClose}
		>
			{children}
		</Menu>
	);
};

MobileMenu.propTypes = {
	id: PropTypes.string.isRequired,
	anchorEl: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired
};

export default MobileMenu;
