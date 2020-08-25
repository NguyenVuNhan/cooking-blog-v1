import axios from "axios";
import { SET_COURSES, GET_COURSES_REQUEST } from "./types";

export const getCourses = () => axios.get("/api/courses");

export const setCourses = courses => ({
	type: SET_COURSES,
	payload: courses
});

export const getCoursesRequest = () => ({
	type: GET_COURSES_REQUEST
});
