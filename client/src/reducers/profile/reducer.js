import {
  SET_PROFILE,
  USER_PROFILE_REQUEST,
  SET_DELETED_RECIPE,
  SET_DELETED_SAVED_RECIPE,
} from "./types";

const initialState = {
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case SET_DELETED_SAVED_RECIPE:
      return {
        ...state,
        savedRecipes: state.savedRecipes.filter(
          (recipe) => recipe._id !== action.payload
        ),
      };
    case SET_DELETED_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        ),
      };
    case SET_PROFILE:
      return { ...action.payload, loading: false };
    default:
      return state;
  }
};
