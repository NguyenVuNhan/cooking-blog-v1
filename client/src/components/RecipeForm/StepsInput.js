import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useFieldArray } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";

import ImageButton from "../ImageButton";

const StepsInput = ({ control, register }) => {
	const { append, remove, fields } = useFieldArray({
		control,
		keyName: "stepsId",
		name: "steps"
	});

	const newStep = () => ({
		duration: 0,
		description: "",
		image: null
	});

	return (
		<Fragment>
			{fields.map((item, index) => (
				<Grid
					key={index}
					container
					item
					sx={12}
					direction="row"
					justify="center"
					alignItems="flex-start"
					spacing={5}
					style={{ marginBottom: 5 }}
				>
					<Grid item xs={3}>
						<ImageButton
							id={`steps[${index}].image`}
							name={`steps[${index}].image`}
							ref={register}
						>
							Choose Step Image
						</ImageButton>
					</Grid>

					<Grid
						item
						container
						direction="row"
						justify="flex-start"
						alignItems="flex-start"
						spacing={2}
						xs={9}
					>
						<Grid
							item
							container
							xs={12}
							direction="row"
							justify="flex-start"
							alignItems="center"
						>
							<Typography variant="h6">
								Step {index + 1}
							</Typography>
							<IconButton
								aria-label="delete"
								onClick={() => remove(index)}
							>
								<DeleteIcon color="error" fontSize="small" />
							</IconButton>
						</Grid>

						<Grid item xs={3}>
							<TextField
								variant="outlined"
								label="Duration"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											Min
										</InputAdornment>
									)
								}}
								id={`steps[${index}].duration`}
								name={`steps[${index}].duration`}
								inputRef={register}
								defaultValue={item.duration}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								multiline
								fullWidth
								variant="outlined"
								id={`steps[${index}].description`}
								name={`steps[${index}].description`}
								inputRef={register}
								defaultValue={item.description}
								label="Step"
							/>
						</Grid>
					</Grid>
				</Grid>
			))}

			<Grid item container alignItems="center" justify="center" xs={12}>
				<Button
					color="primary"
					variant="contained"
					onClick={() => append(newStep())}
				>
					Add step
				</Button>
			</Grid>
		</Fragment>
	);
};

StepsInput.propTypes = {
	register: PropTypes.func.isRequired,
	control: PropTypes.object.isRequired
};

export default StepsInput;
