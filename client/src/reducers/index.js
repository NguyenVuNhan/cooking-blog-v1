import { combineReducers } from "redux";
import { reducer as errorReducer } from "./errors";
import { reducer as authReducer } from "./auth";

export default combineReducers({
	auth: authReducer,
	errors: errorReducer
});
