import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import useStyles from "../styles";
import { isEmpty } from "utils";
import { actions as recipesAction } from "reducers/recipes";
import ImageButton from "components/ImageButton";
import StepsInput from "./StepsInput";

const EditRecipe = ({ actionType, open, onClose, recipe }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { register, control, handleSubmit } = useForm();
	const courses = useSelector(state => state.courses.courses);
	const errors = useSelector(state => state.errors);

	const onSubmit = data => {
		dispatch(recipesAction.uploadRecipeRequest(data));
	};

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
						justify="center"
						alignItems="center"
						spacing={5}
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

						<Grid
							item
							sm={4}
							container
							direction="row"
							justify="space-between"
							alignItems="center"
						>
							<ImageButton
								id="recipeImage"
								name="image"
								ref={register}
							/>
						</Grid>

						<Grid
							container
							item
							xs={8}
							alignItems="flex-start"
							spacing={2}
						>
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
							<Grid item xs={7}>
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
										!isEmpty(errors.course)
											? errors.course
											: ""
									}
								>
									{courses.map((course, i) => (
										<option key={i} value={course._id}>
											{course.name}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item xs={5}>
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
						</Grid>

						<Grid item xs={12}>
							<StepsInput control={control} register={register} />
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
