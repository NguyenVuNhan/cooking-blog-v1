import { SET_RECIPE, SET_RECIPES } from "./types";

const initialState = {
	recipe: {},
	recipes: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_RECIPE:
			return { ...state, recipe: action.payload };
		case SET_RECIPES:
			return { ...state, recipes: action.payload };
		default:
			return state;
	}
};
