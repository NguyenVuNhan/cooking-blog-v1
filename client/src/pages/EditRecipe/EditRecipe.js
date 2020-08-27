import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { actions as recipesAction } from "../../reducers/recipes";
import RecipeForm from "../../components/RecipeForm";

const EditRecipe = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(recipesAction.uploadRecipeRequest(data, history));
  };

  return <RecipeForm actionType="edit" onSubmit={onSubmit} />;
};

export default EditRecipe;
