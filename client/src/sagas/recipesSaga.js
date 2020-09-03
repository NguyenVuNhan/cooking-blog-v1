import { take, fork, all, call, put } from "redux-saga/effects";

import {
  types as recipesType,
  actions as recipesAction,
} from "../reducers/recipes";
import { actions as profileActions } from "../reducers/profile";
import { actions as errorActions } from "../reducers/errors";

function* uploadRecipeFlow() {
  while (true) {
    const { recipe, history } = yield take(recipesType.UPLOAD_RECIPE_REQUEST);
    // TODO: validate image
    try {
      let res = yield call(recipesAction.uploadImage, recipe.image[0]);
      recipe.image = res.data.image;

      for (const i in recipe.steps) {
        if (!recipe.steps.hasOwnProperty(i)) return;

        res = yield call(recipesAction.uploadImage, recipe.steps[i].image[0]);
        recipe.steps[i].image = res.data.image;
      }

      yield call(recipesAction.uploadRecipe, recipe);
      yield history.push("/profile");
      yield put(errorActions.clearErrors);
    } catch (err) {
      if (err instanceof TypeError) {
        const errors = {
          image: "Invalid image",
        };

        yield put(errorActions.setErrors({ errors }));
      }
    }
  }
}

function* updateRecipeFlow() {
  while (true) {
    const { id, recipe, history } = yield take(
      recipesType.UPDATE_RECIPE_REQUEST
    );
    try {
      let res;

      if (recipe.image.length === 0) {
        delete recipe.image;
      } else {
        res = yield call(recipesAction.uploadImage, recipe.image[0]);
        recipe.image = res.data.image;
      }

      for (const i in recipe.steps) {
        if (!recipe.steps.hasOwnProperty(i)) return;

        if (recipe.steps[i].image.length === 0) {
          delete recipe.steps[i].image;
        } else {
          res = yield call(recipesAction.uploadImage, recipe.steps[i].image[0]);
          recipe.steps[i].image = res.data.image;
        }
      }

      yield call(recipesAction.updateRecipe, id, recipe);
      yield history.push("/profile");
      yield put(errorActions.clearErrors);
    } catch (err) {
      if (err instanceof TypeError) {
        const errors = {
          image: "Invalid image",
        };

        yield put(errorActions.setErrors({ errors }));
      }
    }
  }
}

function* deleteRecipeFlow() {
  while (true) {
    const { recipe } = yield take(recipesType.DELETE_RECIPE_REQUEST);
    try {
      yield call(recipesAction.deleteRecipe, recipe);

      yield put(profileActions.setDeletedRecipe(recipe));
    } catch (err) {
      console.log(err.response);
      yield put(errorActions.setErrors(err));
    }
  }
}

function* getRecipeFlow() {
  while (true) {
    const { recipe } = yield take(recipesType.GET_RECIPE_REQUEST);
    try {
      const res = yield call(recipesAction.getRecipe, recipe);

      yield put(recipesAction.setRecipe(res.data.recipe));
    } catch (err) {
      yield put(errorActions.setErrors(err));
    }
  }
}

export default function* recipesSage() {
  yield all([
    fork(uploadRecipeFlow),
    fork(updateRecipeFlow),
    fork(deleteRecipeFlow),
    fork(getRecipeFlow),
  ]);
}
