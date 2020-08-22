import React from "react";
import Box from "@material-ui/core/Box";
import Carousel from "react-multi-carousel";

import useStyles from "./styles";

const CarouselBubble = () => {
	const classes = useStyles();
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 6
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 2
		}
	};

	// TODO update carousel with real data
	return (
		<Carousel
			responsive={responsive}
			removeArrowOnDeviceType={["mobile"]}
			centerMode={true}
		>
			<Box borderRadius="50%" className={classes.bubble}></Box>
			<Box borderRadius="50%" className={classes.bubble}></Box>
			<Box borderRadius="50%" className={classes.bubble}></Box>
			<Box borderRadius="50%" className={classes.bubble}></Box>
			<Box borderRadius="50%" className={classes.bubble}></Box>
			<Box borderRadius="50%" className={classes.bubble}></Box>
			<Box borderRadius="50%" className={classes.bubble}></Box>
			<Box borderRadius="50%" className={classes.bubble}></Box>
			<Box borderRadius="50%" className={classes.bubble}></Box>
		</Carousel>
	);
};

export default CarouselBubble;
