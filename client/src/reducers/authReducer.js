import { SET_CURRENT_USER, LOGIN_REQUEST } from "../actions/types";

const initialState = {
	user: {},
	loading: false,
	isAuthenticated: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { ...state, loading: true };
		case SET_CURRENT_USER:
			return {
				...state,
				user: action.payload,
				loading: false,
				isAuthenticated: true
			};
		default:
			return state;
	}
};
