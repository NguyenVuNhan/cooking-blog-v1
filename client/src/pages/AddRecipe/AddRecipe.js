import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { actions as recipesAction } from "../../reducers/recipes";
import RecipeForm from "../../components/RecipeForm";

const AddRecipe = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(recipesAction.uploadRecipeRequest(data, history));
  };

  return <RecipeForm onSubmit={onSubmit} />;
};

export default AddRecipe;
