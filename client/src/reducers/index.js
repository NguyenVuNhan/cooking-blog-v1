import { combineReducers } from "redux";
import { default as errorReducer } from "./errors/reducer";
import { default as authReducer } from "./auth/reducer";
import { default as coursesReducer } from "./courses/reducer";
import { default as recipeReducer } from "./recipes/reducer";

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	courses: coursesReducer,
	recipe: recipeReducer
});
