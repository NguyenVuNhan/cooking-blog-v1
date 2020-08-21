import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";

const MobileMenu = ({ id, anchorEl, onClose, children }) => {
	const isOpen = Boolean(anchorEl);

	return (
		<Menu
			anchorEl={anchorEl}
			getContentAnchorEl={null}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			id={id}
			keepMounted
			open={isOpen}
			onClose={onClose}
		>
			{children}
		</Menu>
	);
};

MobileMenu.propTypes = {
	id: PropTypes.string.isRequired,
	anchorEl: PropTypes.object,
	onClose: PropTypes.func.isRequired
};

export default React.memo(MobileMenu);
