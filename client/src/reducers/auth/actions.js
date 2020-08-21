import axios from "axios";
import {
	LOGIN_REQUEST,
	REGISTER_REQUEST,
	LOGOUT_REQUEST,
	SET_CURRENT_USER,
	USER_PROFILE_REQUEST
} from "./types";

export const loginUser = user => axios.post("/api/users/login", user);
export const registerUser = user => axios.post("/api/users/register", user);
export const getUserProfile = () => axios.get("/api/users/current");

export const loginRequest = user => ({
	type: LOGIN_REQUEST,
	user
});

export const registerRequest = (user, history) => ({
	type: REGISTER_REQUEST,
	user,
	history
});

export const logoutRequest = history => ({
	type: LOGOUT_REQUEST,
	history
});

export const setCurrentUser = user => ({
	type: SET_CURRENT_USER,
	payload: user
});

export const userProfileRequest = () => ({
	type: USER_PROFILE_REQUEST
});
