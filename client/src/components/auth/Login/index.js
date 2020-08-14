import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import isEmpty from "../../../utils/isEmpty";
import { loginRequest } from "../../../actions/authActions";

const Login = () => {
	const { handleSubmit, register } = useForm();
	const errors = useSelector(state => state.errors);
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	if (isAuthenticated) {
		return <Redirect to="/" />;
	}

	const onSubmit = data => {
		dispatch(loginRequest(data));
	};

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<Paper style={{ padding: 16, marginTop: 20 }}>
				<Grid container alignItems="flex-start" spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h2" align="center" noWrap>
							Login
						</Typography>
						<Typography variant="subtitle1" align="center" noWrap>
							Login to your Cooking Blog account
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							inputRef={register}
							name="email"
							placeholder="Email Address"
							type="email"
							variant="outlined"
							error={!isEmpty(errors.email)}
							helperText={
								!isEmpty(errors.email) ? errors.email : ""
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							inputRef={register}
							name="password"
							placeholder="Password"
							variant="outlined"
							error={!isEmpty(errors.password)}
							type="password"
							helperText={
								!isEmpty(errors.password) ? errors.password : ""
							}
						/>
					</Grid>
					<Grid item style={{ marginTop: 16 }}>
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
		</form>
	);
};

Login.defaultProps = {};

export default Login;