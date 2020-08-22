import React, { Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Carousel from "react-multi-carousel";
import DeleteIcon from "@material-ui/icons/Delete";

import ImageButton from "components/ImageButton";

const CustomArrow = ({ onClick, side }) => {
	return (
		<button
			className={`react-multiple-carousel__arrow react-multiple-carousel__arrow--${side}`}
			onClick={() => onClick()}
		/>
	);
};

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
			<Grid item container alignItems="center" justify="center" xs={12}>
				<Button
					color="primary"
					variant="contained"
					onClick={() => append(newStep())}
				>
					Add step
				</Button>
			</Grid>
			<Carousel
				autoPlay={false}
				customRightArrow={<CustomArrow side="right" />}
				customLeftArrow={<CustomArrow side="left" />}
				responsive={{
					any: {
						breakpoint: { max: 4000, min: 0 },
						items: 1
					}
				}}
			>
				{fields.map((item, index) => (
					<Grid
						key={index}
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={5}
						style={{ paddingBottom: 5 }}
					>
						<Grid item sm={4}>
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
							sm={7}
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
									Step {index}
								</Typography>
								<IconButton
									aria-label="delete"
									onClick={() => remove(index)}
								>
									<DeleteIcon
										color="error"
										fontSize="small"
									/>
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
			</Carousel>
		</Fragment>
	);
};

StepsInput.defaultProps = {};

export default StepsInput;
