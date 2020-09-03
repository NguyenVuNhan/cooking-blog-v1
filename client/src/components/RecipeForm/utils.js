export const safeRecipe = (recipe) => {
  if (recipe.image) {
    recipe.tmpImage = recipe.image.link;
    recipe.image = null;
  }

  for (const i in recipe.steps) {
    if (!recipe.steps.hasOwnProperty(i)) return;

    if (recipe.steps[i].image) {
      recipe.steps[i].tmpImage = recipe.steps[i].image.link;
      recipe.steps[i].image = null;
    }
  }
};
