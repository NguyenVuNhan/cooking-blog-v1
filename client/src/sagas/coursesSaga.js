import { take, call, put, fork, all, delay } from "redux-saga/effects";

import {
	types as coursesType,
	actions as coursesAction
} from "reducers/courses";
import { actions as errorActions } from "reducers/errors";

export function* getCoursesFlow() {
	while (true) {
		yield take(coursesType.GET_COURSES_REQUEST);
		try {
			const res = yield call(coursesAction.getCourses);
			if (res.data) {
				yield put(coursesAction.setCourses(res.data));
			}
		} catch (err) {
			yield put(errorActions.setErrors(err.response.data));
			console.log(err);
		}

		// Avoid the courses update too frequently
		// Debounce for 10 min
		yield delay(10 * 60 * 1000);
	}
}

export default function* coursesSaga() {
	yield all([fork(getCoursesFlow)]);
}
