import { SET_COURSES } from "./types";

const initialState = {
	courses: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_COURSES:
			return { ...action.payload };
		default:
			return state;
	}
};
