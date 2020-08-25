import jwt_decode from "jwt-decode";
import { take, call, put, fork, all } from "redux-saga/effects";

import {
	types as recipesType,
	actions as recipesAction
} from "../reducers/recipes";
import { types as authTypes, actions as authActions } from "../reducers/auth";
import { actions as errorActions } from "../reducers/errors";
import { setAuthToken, clearAuthToken } from "../utils";

function* loginFlow() {
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

function* registerFlow() {
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

function* logoutFlow() {
	while (true) {
		const { history } = yield take(authTypes.LOGOUT_REQUEST);
		clearAuthToken();
		yield put(authActions.setCurrentUser({}));

		yield history.push("/");
	}
}

function* getProfileFlow() {
	while (true) {
		yield take(authTypes.USER_PROFILE_REQUEST);
		try {
			const { data } = yield call(authActions.getUserProfile);
			if (typeof data === "object" && data !== null) {
				yield put(authActions.setCurrentUser(data.user));
				yield put(recipesAction.setRecipes(data.user.recipes));
			}
		} catch (err) {
			yield put(errorActions.setErrors(err.response.data));
		}
	}
}

export default function* authSaga() {
	yield all([
		fork(loginFlow),
		fork(registerFlow),
		fork(logoutFlow),
		fork(getProfileFlow)
	]);
}
