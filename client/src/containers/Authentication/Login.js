import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { isEmpty } from "utils";
import { actions as authActions } from "reducers/auth";

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { handleSubmit, register } = useForm();
	const errors = useSelector(state => state.errors);
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

	if (isAuthenticated) {
		return <Redirect to="/" />;
	}

	const onSubmit = data => {
		dispatch(authActions.loginRequest(data));
	};

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<Paper elevation={24} style={{ padding: 16, marginTop: 80 }}>
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
							label="Email Address"
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
							label="Password"
							variant="outlined"
							error={!isEmpty(errors.password)}
							type="password"
							helperText={
								!isEmpty(errors.password) ? errors.password : ""
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
						<Button
							color="primary"
							onClick={() => history.push("/register")}
						>
							Create Account
						</Button>
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
