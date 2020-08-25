import axios from "axios";
import {
	UPLOAD_RECIPE_REQUEST,
	DELETE_RECIPE_REQUEST,
	SET_RECIPE,
	SET_RECIPES
} from "./types";

export const uploadImage = data => {
	const formData = new FormData();
	formData.append("image", data);
	return axios.post("/api/images", formData, {
		headers: {
			accept: "application/json",
			"Accept-Language": "en-US,en;q=0.8",
			"Content-Type": `multipart/form-data; boundary=${data._boundary}`
		}
	});
};
export const uploadRecipe = recipe => axios.post("/api/recipes", recipe);
export const deleteRecipe = recipe => axios.delete(`/api/recipes/${recipe}`);

export const uploadRecipeRequest = (recipe, history) => ({
	type: UPLOAD_RECIPE_REQUEST,
	recipe
});

export const deleteRecipeRequest = recipe => ({
	type: DELETE_RECIPE_REQUEST,
	recipe
});

export const setRecipe = recipe => ({
	type: SET_RECIPE,
	payload: recipe
});

export const setRecipes = recipes => ({
	type: SET_RECIPES,
	payload: recipes
});
