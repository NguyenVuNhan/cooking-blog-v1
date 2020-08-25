import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import useStyles from "./styles.js";
import StepsInput from "./StepsInput";
import GeneralInput from "./GeneralInput";

const EditRecipe = ({ actionType, recipe, onSubmit }) => {
	const classes = useStyles();
	const { register, control, handleSubmit } = useForm();
	const courses = useSelector(state => state.courses.courses);
	const errors = useSelector(state => state.errors);

	return (
		<Container
			component={Paper}
			maxWidth="md"
			elevation={24}
			className={classes.paper}
		>
			<Grid
				container
				justify="center"
				alignItems="flex-start"
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
						variant="h1"
						align="center"
						id="recipe-modal-title"
						noWrap
					>
						{(actionType === "add" && "Add ") ||
							(actionType === "edit" && "Edit ")}{" "}
						your recipe
					</Typography>
				</Grid>

				{errors.image && <Alert severity="error">{errors.image}</Alert>}

				<Grid item xs={12} component={Box} borderBottom={3}></Grid>
				<Grid item xs={12}>
					<Typography variant="h5" noWrap>
						General Info
					</Typography>
				</Grid>
				<GeneralInput
					register={register}
					errors={errors}
					courses={courses}
					control={control}
				/>

				<Grid item xs={12} component={Box} borderBottom={3}></Grid>
				<Grid item xs={12}>
					<Typography variant="h5" noWrap>
						Steps
					</Typography>
				</Grid>
				<StepsInput control={control} register={register} />

				<Grid item xs={12} component={Box} borderBottom={3}></Grid>
				<Grid
					container
					direction="row-reverse"
					justify="space-between"
					alignItems="center"
					style={{ padding: 20 }}
				>
					<Button variant="contained" color="primary" type="submit">
						Submit
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

EditRecipe.defaultProps = {
	actionType: "add",
	recipe: {}
};

EditRecipe.propTypes = {
	actionType: PropTypes.oneOf(["add", "edit"]),
	recipe: PropTypes.object,
	onSubmit: PropTypes.func.isRequired
};

export default EditRecipe;
