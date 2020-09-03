import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import coursesSaga from "./coursesSaga";
import recipesSaga from "./recipesSaga";
import profileSaga from "./profileSaga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(coursesSaga),
    fork(recipesSaga),
    fork(profileSaga),
  ]);
}
