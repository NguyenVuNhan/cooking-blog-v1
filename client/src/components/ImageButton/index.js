import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const ImageButton = forwardRef(({ id, name, children }, forwardedRef) => {
	return (
		<label htmlFor={id}>
			<input
				id={id}
				style={{ display: "none" }}
				ref={forwardedRef}
				type="file"
				name={name}
			/>
			<Button color="primary" variant="contained" component="span">
				{children ? children : "Choose Image"}
			</Button>
		</label>
	);
});

ImageButton.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default ImageButton;
