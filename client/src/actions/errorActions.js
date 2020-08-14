import { SET_ERRORS } from "./types";

export const setErrors = errors => ({
	type: SET_ERRORS,
	payload: errors
});
