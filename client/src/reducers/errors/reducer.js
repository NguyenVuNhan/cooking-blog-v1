import { SET_ERRORS, CLEAR_ERRORS } from "./types";

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_ERRORS:
			return {};
		case SET_ERRORS:
			return action.payload.errors;
		default:
			return state;
	}
};
