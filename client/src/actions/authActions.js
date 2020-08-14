import axios from "axios";
import { LOGIN_REQUEST, LOGOUT_REQUEST, SET_CURRENT_USER } from "./types";

export const loginUser = newUser => axios.post("/api/users/login", newUser);

export const loginRequest = newUser => ({
	type: LOGIN_REQUEST,
	newUser
});

export const setCurrentUser = user => ({
	type: SET_CURRENT_USER,
	payload: user
});

export const logoutRequest = history => ({
	type: LOGOUT_REQUEST,
	history
});
