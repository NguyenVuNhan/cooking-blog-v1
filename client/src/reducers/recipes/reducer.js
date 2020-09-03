import {
  SET_RECIPE,
  SET_RECIPES,
  GET_RECIPE_REQUEST,
  GET_RECIPES_REQUEST,
} from "./types";

const initialState = {
  recipe: {},
  recipes: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE_REQUEST:
    case GET_RECIPES_REQUEST:
      return { ...state, loading: true };
    case SET_RECIPE:
      return { ...state, recipe: action.payload, loading: false };
    case SET_RECIPES:
      return { ...state, recipes: action.payload, loading: false };
    default:
      return state;
  }
};
