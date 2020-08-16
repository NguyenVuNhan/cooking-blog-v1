import jwt_decode from "jwt-decode";
import { take, call, put } from "redux-saga/effects";

import { types as authTypes, actions as authActions } from "reducers/auth";
import { actions as errorActions } from "reducers/errors";
import { setAuthToken, clearAuthToken } from "utils";

export function* loginFlow() {
	while (true) {
		const { user } = yield take(authTypes.LOGIN_REQUEST);
		try {
			const res = yield call(authActions.loginUser, user);
			if (res.data) {
				const { token } = res.data;
				localStorage.setItem("jwtToken", token);
				setAuthToken(token);
				const decoded = jwt_decode(token);

				yield put(authActions.setCurrentUser(decoded));
				yield put(errorActions.clearErrors());
			}
		} catch (err) {
			yield put(errorActions.setErrors(err.response.data));
		}
	}
}

export function* registerFlow() {
	while (true) {
		const { user, history } = yield take(authTypes.REGISTER_REQUEST);
		try {
			yield call(authActions.registerUser, user);

			yield history.push("/login");
			yield put(errorActions.clearErrors());
		} catch (err) {
			yield put(errorActions.setErrors(err.response.data));
		}
	}
}
export function* logoutFlow() {
	while (true) {
		const { history } = yield take(authTypes.LOGOUT_REQUEST);
		clearAuthToken();
		yield put(authActions.setCurrentUser({}));

		yield history.push("/");
	}
}
