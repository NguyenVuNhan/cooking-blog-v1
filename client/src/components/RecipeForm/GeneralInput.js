import React, { Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

import { getCoursesRequest } from "../../reducers/courses/actions";
import { isEmpty, useFetching } from "../../utils";
import ImageButton from "../../components/ImageButton";

const GeneralInput = ({ register, control, errors, courses }) => {
	useFetching(getCoursesRequest);

	const { append, remove, fields } = useFieldArray({
		control,
		keyName: "ingredientId",
		name: "ingredients"
	});

	const newIngredient = () => ({
		name: "",
		quantity: ""
	});

	return (
		<Fragment>
			{/*Image upload*/}
			<Grid item sm={3} container direction="row">
				<ImageButton id="recipeImage" name="image" ref={register} />
			</Grid>

			{/* General info*/}
			<Grid container item sm={5} alignItems="flex-start" spacing={2}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						inputRef={register}
						name="name"
						label="Recipe Name"
						variant="outlined"
						error={!isEmpty(errors.name)}
						helperText={!isEmpty(errors.name) ? errors.name : ""}
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
							!isEmpty(errors.course) ? errors.course : ""
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
							!isEmpty(errors.duration) ? errors.duration : ""
						}
					/>
				</Grid>
			</Grid>

			{/* Ingredients */}
			<Grid item sm={4} container direction="row">
				<Typography align="center" variant="h6">
					Ingredients
					<IconButton
						color="primary"
						variant="contained"
						onClick={() => append(newIngredient())}
					>
						<AddCircleOutlineIcon />
					</IconButton>
				</Typography>

				<Grid container direction="row" spacing={1}>
					{fields.map((item, index) => (
						<Grid
							key={index}
							container
							item
							alignItems="center"
							xs={12}
							spacing={1}
						>
							<Grid item xs={7}>
								<TextField
									fullWidth
									name={`ingredients[${index}].name`}
									label="Name"
									variant="outlined"
									size="small"
									inputRef={register}
									error={!isEmpty(errors.ingredients)}
									helperText={
										!isEmpty(errors.ingredients)
											? errors.ingredients
											: ""
									}
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									fullWidth
									name={`ingredients[${index}].quantity`}
									label="Quantity"
									variant="outlined"
									size="small"
									inputRef={register}
									error={!isEmpty(errors.ingredients)}
									helperText={
										!isEmpty(errors.ingredients)
											? errors.ingredients
											: ""
									}
								/>
							</Grid>
							<Grid item xs={1}>
								<IconButton
									aria-label="delete"
									onClick={() => remove(index)}
								>
									<DeleteIcon color="error" />
								</IconButton>
							</Grid>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Fragment>
	);
};

GeneralInput.propTypes = {
	register: PropTypes.func.isRequired,
	control: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	errors: PropTypes.object
};

export default GeneralInput;
