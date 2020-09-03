import axios from "axios";

import { USER_PROFILE_REQUEST, SET_PROFILE, SET_DELETED_RECIPE } from "./types";

export const userProfileRequest = () => ({
  type: USER_PROFILE_REQUEST,
});

export const getUserProfile = () => axios.get("/api/users/current");

export const setDeletedRecipe = (recipe) => ({
  type: SET_DELETED_RECIPE,
  payload: recipe,
});

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});
