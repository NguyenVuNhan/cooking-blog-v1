import { take, fork, all, call, put } from "redux-saga/effects";

import {
	types as recipesType,
	actions as recipesAction
} from "../reducers/recipes";
import { actions as errorActions } from "../reducers/errors";

function* uploadRecipeFlow() {
	while (true) {
		const { recipe, history } = yield take(
			recipesType.UPLOAD_RECIPE_REQUEST
		);
		// TODO: validate image
		try {
			console.log(recipe);
			let res = yield call(recipesAction.uploadImage, recipe.image[0]);
			recipe.image = res.data.image;

			for (const i in recipe.steps) {
				if (!recipe.steps.hasOwnProperty(i)) return;

				res = yield call(
					recipesAction.uploadImage,
					recipe.steps[i].image[0]
				);
				recipe.steps[i].image = res.data.image;
			}

			yield call(recipesAction.uploadRecipe, recipe);
			yield history.push("/profile");
			yield put(errorActions.clearErrors);
		} catch (err) {
			if (err instanceof TypeError) {
				const errors = {
					image: "Invalid image"
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
			yield put(recipesAction.deleteRecipe, recipe);
		} catch (err) {
			yield put(errorActions.setErrors(err));
		}
	}
}

export default function* recipesSage() {
	yield all([fork(uploadRecipeFlow), fork(deleteRecipeFlow)]);
}
