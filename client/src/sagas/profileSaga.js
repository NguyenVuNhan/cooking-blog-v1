import { take, call, put, all, fork } from "redux-saga/effects";

import {
  actions as profileActions,
  types as profileTypes,
} from "../reducers/profile";
import { actions as errorActions } from "../reducers/errors";

function* getProfileFlow() {
  while (true) {
    yield take(profileTypes.USER_PROFILE_REQUEST);
    try {
      const { data } = yield call(profileActions.getUserProfile);

      if (typeof data === "object" && data !== null) {
        yield put(profileActions.setProfile(data.user));
      }
    } catch (err) {
      yield put(errorActions.setErrors(err.response.data));
    }
  }
}

export default function* profileSaga() {
  yield all([fork(getProfileFlow)]);
}
