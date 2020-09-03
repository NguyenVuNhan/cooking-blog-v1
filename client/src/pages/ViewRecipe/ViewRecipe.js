import React from "react";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { actions as recipesAction } from "../../reducers/recipes";
import { useFetching } from "../../utils";
import Spinner from "../../components/Spinner";

function ViewRecipe({ match }) {
  const recipe = useSelector((state) => state.recipe);

  const recipeId = match.params.id;
  useFetching(recipesAction.getRecipeRequest, recipeId);

  if (recipe.loading) {
    return <Spinner />;
  }

  return (
    <Container maxWidth="md" className="mt-5">
      <Box fontWeight="fontWeightMedium" textAlign="center">
        <Typography variant="h1">{recipe.recipe.name}</Typography>
      </Box>
    </Container>
  );
}

export default ViewRecipe;
