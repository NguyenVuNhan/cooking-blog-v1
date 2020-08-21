import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import coursesSaga from "./coursesSaga";
import recipesSaga from "./recipesSaga";

export default function* rootSaga() {
	yield all([fork(authSaga), fork(coursesSaga), fork(recipesSaga)]);
}
