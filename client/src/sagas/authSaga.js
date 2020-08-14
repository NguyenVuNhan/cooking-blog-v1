import jwt_decode from "jwt-decode";
import { take, call, put } from "redux-saga/effects";

import { LOGIN_REQUEST } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import { loginUser, setCurrentUser } from "../actions/authActions";
import { setErrors } from "../actions/errorActions";

export function* loginFlow() {
	while (true) {
		const { newUser } = yield take(LOGIN_REQUEST);
		try {
			const res = yield call(loginUser, newUser);
			if (res.data) {
				const { token } = res.data;
				localStorage.setItem("jwtToken", token);
				setAuthToken(token);
				const decoded = jwt_decode(token);

				yield put(setCurrentUser(decoded));
			}
		} catch (err) {
			yield put(setErrors(err.response.data));
		}
	}
}
