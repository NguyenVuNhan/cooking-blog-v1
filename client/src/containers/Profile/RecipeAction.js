import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Carousel from "react-multi-carousel";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageIcon from "@material-ui/icons/Image";

import "react-multi-carousel/lib/styles.css";
import useStyles from "./styles";
import { isEmpty } from "utils";
import { actions as recipesAction } from "reducers/recipes";
import ImageButton from "components/ImageButton";

const EditRecipe = ({ actionType, open, onClose, recipe }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { register, control, handleSubmit } = useForm();
	const [steps, setSteps] = useState([]);
	const courses = useSelector(state => state.courses.courses);
	const errors = useSelector(state => state.errors);

	const onSubmit = data => {
		dispatch(recipesAction.uploadRecipeRequest(data));
	};

	const addStep = () => {
		const step = {
			description: null,
			duration: null,
			image: null
		};
		setSteps([...steps, step]);
	};

	const removeStep = index => {
		const newStep = [...steps];
		newStep.splice(index, 1);
		setSteps(newStep);
	};

	const carouselResponsive = {
		any: {
			breakpoint: { max: 4000, min: 0 },
			items: 1
		}
	};

	const addStepSection = steps.map((item, index) => (
		<Grid
			key={index}
			container
			direction="row"
			justify="center"
			spacing={1}
		>
			<Grid
				item
				container
				xs={12}
				container
				direction="row"
				justify="flex-start"
				alignItems="center"
			>
				<Typography variant="h6">Step {index}</Typography>

				<IconButton
					aria-label="delete"
					onClick={() => removeStep(index)}
				>
					<DeleteIcon color="error" fontSize="small" />
				</IconButton>
			</Grid>

			<Grid item md={3}>
				<TextField
					variant="outlined"
					label="Duration"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">Min</InputAdornment>
						)
					}}
					name={`steps[${index}].duration`}
					ref={register}
					defaultValue={item.duration}
				/>
			</Grid>

			<Grid
				item
				component={TextField}
				multiline
				variant="outlined"
				name={`steps[${index}].description`}
				ref={register}
				defaultValue={item.description}
				md={9}
			/>

			<Grid item container alignItems="center" justify="center" xs={12}>
				<ImageButton
					id={`steps[${index}].image`}
					name={`steps[${index}].image`}
				>
					Choose Step Image
				</ImageButton>
			</Grid>
		</Grid>
	));

	return (
		<Modal
			open={open}
			onClose={onClose}
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
			className={classes.modal}
			aria-labelledby="recipe-modal-title"
			closeAfterTransition
		>
			<Fade in={open}>
				<Paper elevation={24} className={classes.paper}>
					<Grid
						container
						alignItems="flex-start"
						spacing={2}
						component="form"
						noValidate
						onSubmit={handleSubmit(onSubmit)}
					>
						<Grid
							container
							item
							xs={12}
							direction="column"
							justify="center"
							alignItems="center"
						>
							<Typography
								variant="h2"
								align="center"
								id="recipe-modal-title"
								noWrap
							>
								{(actionType === "add" && "Add ") ||
									(actionType === "edit" && "Edit ")}
								your recipe
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								inputRef={register}
								name="name"
								label="Recipe Name"
								variant="outlined"
								error={!isEmpty(errors.name)}
								helperText={
									!isEmpty(errors.name) ? errors.name : ""
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								inputRef={register}
								name="ingredients"
								label="Ingredients"
								variant="outlined"
								error={!isEmpty(errors.ingredients)}
								helperText={
									!isEmpty(errors.ingredients)
										? errors.ingredients
										: ""
								}
							/>
						</Grid>
						<Grid item xs={9}>
							<TextField
								fullWidth
								select
								inputRef={register}
								name="course"
								label="Course"
								variant="outlined"
								error={!isEmpty(errors.course)}
								SelectProps={{
									native: true
								}}
								helperText={
									!isEmpty(errors.course) ? errors.course : ""
								}
							>
								{courses.map((course, i) => (
									<option key={i} value={course.name}>
										{course.name}
									</option>
								))}
							</TextField>
						</Grid>
						<Grid item xs={3}>
							<TextField
								fullWidth
								inputRef={register}
								name="duration"
								label="Duration"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											Min
										</InputAdornment>
									)
								}}
								variant="outlined"
								error={!isEmpty(errors.duration)}
								helperText={
									!isEmpty(errors.duration)
										? errors.duration
										: ""
								}
							/>
						</Grid>
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center"
							style={{ padding: 20 }}
						>
							<ImageButton
								id="recipeImage"
								name="image"
								ref={register}
							/>
							<Button
								color="primary"
								variant="contained"
								onClick={addStep}
							>
								Add step
							</Button>
						</Grid>

						<Grid item xs={12}>
							<Carousel
								autoPlay={false}
								responsive={carouselResponsive}
							>
								{addStepSection}
							</Carousel>
						</Grid>

						<Grid
							container
							direction="row-reverse"
							justify="space-between"
							alignItems="center"
							style={{ padding: 20 }}
						>
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Fade>
		</Modal>
	);
};

EditRecipe.defaultProps = {
	actionType: "add",
	recipe: {}
};

EditRecipe.propTypes = {
	actionType: PropTypes.oneOf(["add", "edit"]),
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	recipe: PropTypes.object
};

export default EditRecipe;
