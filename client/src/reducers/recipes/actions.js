import axios from "axios";
import { UPLOAD_RECIPE_REQUEST } from "./types";

export const uploadImage = data => {
	const formData = new FormData();
	formData.append("image", data);
	return axios.post("api/images", formData, {
		headers: {
			accept: "application/json",
			"Accept-Language": "en-US,en;q=0.8",
			"Content-Type": `multipart/form-data; boundary=${data._boundary}`
		}
	});
};

export const uploadRecipe = recipe => axios.post("/api/recipes", recipe);

export const uploadRecipeRequest = recipe => ({
	type: UPLOAD_RECIPE_REQUEST,
	recipe
});
