import jwt_decode from "jwt-decode";
import { take, call, put } from "redux-saga/effects";

import {
	LOGIN_REQUEST,
	REGISTER_REQUEST,
	LOGOUT_REQUEST
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import clearAuthToken from "../utils/clearAuthToken";
import { setErrors } from "../actions/errorActions";
import {
	loginUser,
	registerUser,
	setCurrentUser
} from "../actions/authActions";

export function* loginFlow() {
	while (true) {
		const { user } = yield take(LOGIN_REQUEST);
		try {
			const res = yield call(loginUser, user);
			if (res.data) {
				const { token } = res.data;
				localStorage.setItem("jwtToken", token);
				setAuthToken(token);
				const decoded = jwt_decode(token);

				yield put(setCurrentUser(decoded));
				yield put(setErrors({}));
			}
		} catch (err) {
			yield put(setErrors(err.response.data));
		}
	}
}

export function* registerFlow() {
	while (true) {
		const { user, history } = yield take(REGISTER_REQUEST);
		try {
			yield call(registerUser, user);

			yield history.push("/login");
			yield put(setErrors({}));
		} catch (err) {
			yield put(setErrors(err.response.data));
		}
	}
}
export function* logoutFlow() {
	while (true) {
		const { history } = yield take(LOGOUT_REQUEST);
		clearAuthToken();
		yield put(setCurrentUser({}));

		yield history.push("/");
	}
}
