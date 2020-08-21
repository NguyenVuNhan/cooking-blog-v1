import axios from "axios";
import { UPLOAD_RECIPE_REQUEST } from "./types";

export const uploadImage = image =>
	axios.post("api/images", image, {
		headers: {
			accept: "application/json",
			"Accept-Language": "en-US,en;q=0.8",
			"Content-Type": `multipart/form-data; boundary=${image._boundary}`
		}
	});

export const uploadRecipeRequest = recipe => ({
	type: UPLOAD_RECIPE_REQUEST,
	recipe
});
