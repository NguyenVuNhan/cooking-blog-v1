import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { actions as recipesAction } from "../../reducers/recipes";
import { useFetching } from "../../utils";
import Spinner from "../../components/Spinner";
import RecipeForm from "../../components/RecipeForm";

const EditRecipe = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);
  const recipeId = match.params.id;
  useFetching(recipesAction.getRecipeRequest, recipeId);

  const onSubmit = (data) => {
    dispatch(recipesAction.updateRecipeRequest(recipeId, data, history));
  };

  if (recipe.loading) {
    return <Spinner />;
  }

  return (
    <RecipeForm actionType="edit" recipe={recipe.recipe} onSubmit={onSubmit} />
  );
};

export default EditRecipe;
