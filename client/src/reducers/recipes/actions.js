import axios from "axios";
import {
  GET_RECIPE_REQUEST,
  UPDATE_RECIPE_REQUEST,
  UPLOAD_RECIPE_REQUEST,
  DELETE_RECIPE_REQUEST,
  SET_RECIPE,
  SET_RECIPES,
} from "./types";

/**
 * Upload image to imgur
 * @param {File} data
 */
export const uploadImage = (data) => {
  const formData = new FormData();
  formData.append("image", data);
  return axios.post("/api/images", formData, {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    },
  });
};

/**
 * Get recipe via id
 * @param {String} recipe
 */
export const getRecipeRequest = (recipe) => ({
  type: GET_RECIPE_REQUEST,
  recipe,
});
export const getRecipe = (recipe) =>
  axios.get(`/api/recipes/recipe?id=${recipe}`);

/**
 * upload new recipe and redirect to /profile
 * @param {Object} recipe
 * @param {Function} history
 */
export const uploadRecipeRequest = (recipe, history) => ({
  type: UPLOAD_RECIPE_REQUEST,
  recipe,
  history,
});
export const uploadRecipe = (recipe) => axios.post("/api/recipes", recipe);

/**
 * update recipe with given id and re direct to /Profile
 * @param {Object} recipe
 * @param {Function} history
 */
export const updateRecipeRequest = (id, recipe, history) => ({
  type: UPDATE_RECIPE_REQUEST,
  id,
  recipe,
  history,
});
export const updateRecipe = (id, recipe) =>
  axios.put(`/api/recipes/${id}`, recipe);

/**
 * Delete recipe with given id
 * @param {String} recipe
 */
export const deleteRecipeRequest = (recipe) => ({
  type: DELETE_RECIPE_REQUEST,
  recipe,
});
export const deleteRecipe = (recipe) => axios.delete(`/api/recipes/${recipe}`);

/**
 * Set recipe of redux store
 * @param {Object} recipe
 */
export const setRecipe = (recipe) => ({
  type: SET_RECIPE,
  payload: recipe,
});
/**
 * Set recipes of redux store
 * @param {Array} recipes
 */
export const setRecipes = (recipes) => ({
  type: SET_RECIPES,
  payload: recipes,
});
