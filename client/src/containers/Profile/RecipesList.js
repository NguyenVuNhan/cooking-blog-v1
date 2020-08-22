import React, { useState, lazy } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import { actions as coursesAction } from "reducers/courses";
import imgurUrlModifier from "utils/imgurUrlModifier";
import useStyles from "./styles";

const Modal = lazy(() => import("./Modal"));

const RecipesList = ({ recipes, showAddmore }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState(true);

	const handleModalOpen = () => {
		setModalOpen(true);
		dispatch(coursesAction.getCoursesRequest());
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	return (
		<React.Fragment>
			<Grid
				container
				spacing={3}
				direction="row"
				justify="center"
				alignItems="stretch"
			>
				{recipes.map(({ image, name, duration, date }, i) => (
					<Grid item key={i} xl={2} lg={3} md={4} sm={6} xs={12}>
						<Card>
							<CardActionArea>
								<CardMedia
									className={classes.cardMedia}
									image={imgurUrlModifier(image.link, "m")}
									title={name}
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										{name}
									</Typography>
									<Typography
										variant="subtitle1"
										color="textSecondary"
									>
										{date}
									</Typography>
									<Grid
										container
										spacing={0}
										alignItems="center"
									>
										<AccessTimeIcon fontSize="small" />
										<Typography
											variant="subtitle1"
											color="textSecondary"
											align="left"
										>
											{duration} min
										</Typography>
									</Grid>{" "}
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}

				{showAddmore && (
					<Grid
						item
						key={-1}
						xl={2}
						lg={3}
						md={4}
						sm={6}
						xs={12}
						component={ButtonBase}
						onClick={handleModalOpen}
					>
						<Box
							border={2}
							borderColor="grey.900"
							className={`${classes.addMoreCard} ${classes.borderDashed}`}
						>
							<AddCircleOutlineIcon style={{ fontSize: 80 }} />
						</Box>
					</Grid>
				)}
			</Grid>
			{showAddmore && (
				<Modal open={modalOpen} onClose={handleModalClose} />
			)}
		</React.Fragment>
	);
};

RecipesList.defaultProps = {
	showAddmore: false
};

RecipesList.propTypes = {
	recipes: PropTypes.array.isRequired,
	showAddmore: PropTypes.bool
};

export default React.memo(RecipesList);
