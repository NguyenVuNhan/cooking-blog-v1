import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import CarouselBubble from "./CarouselBubble";
import useStyles from "./styles";

const Landing = () => {
	const classes = useStyles();

	return (
		<div className={classes.background}>
			<Container maxWidth="sm" height="100vh">
				<Box
					height="100vh"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<div
						style={{
							overflow: "hidden",
							maxWidth: "fit-content"
						}}
					>
						<Typography
							align="center"
							className={classes.title}
							variant="h1"
						>
							Cooking Blog
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Find your recipe…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								inputProps={{ "aria-label": "search" }}
							/>
						</div>
						<CarouselBubble />
					</div>
				</Box>
			</Container>
		</div>
	);
};

export default Landing;
