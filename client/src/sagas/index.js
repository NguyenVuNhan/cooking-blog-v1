import { all } from "redux-saga/effects";
import { loginFlow } from "./authSaga";

export default function* rootSaga() {
	yield all([loginFlow()]);
}
