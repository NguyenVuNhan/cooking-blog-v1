import { all } from "redux-saga/effects";
import { loginFlow, registerFlow, logoutFlow } from "./authSaga";

export default function* rootSaga() {
	yield all([loginFlow(), registerFlow(), logoutFlow()]);
}
