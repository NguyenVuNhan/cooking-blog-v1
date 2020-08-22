import { take, fork, all, call } from "redux-saga/effects";

import {
	types as recipesType,
	actions as recipesAction
} from "reducers/recipes";

export function* uploadRecipeFlow() {
	while (true) {
		const { recipe } = yield take(recipesType.UPLOAD_RECIPE_REQUEST);
		try {
			console.log(recipe);
			break;
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
		} catch (err) {
			console.log(err);
		}
	}
}

export default function* recipesSage() {
	yield all([fork(uploadRecipeFlow)]);
}
