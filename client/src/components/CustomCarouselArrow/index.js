import React, { memo } from "react";
import PropTypes from "prop-types";

const CustomCarouselArrow = ({ onClick, side }) => {
	return (
		<button
			className={`react-multiple-carousel__arrow react-multiple-carousel__arrow--${side}`}
			onClick={() => onClick()}
		/>
	);
};

CustomCarouselArrow.propTypes = {
	side: PropTypes.string.isRequired
};

export default memo(CustomCarouselArrow);
