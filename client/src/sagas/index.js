import { all } from "redux-saga/effects";
import { loginFlow, logoutFlow } from "./authSaga";

export default function* rootSaga() {
	yield all([loginFlow(), logoutFlow()]);
}
