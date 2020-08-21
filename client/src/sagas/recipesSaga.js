import { take, fork, all } from "redux-saga/effects";

import { types as recipesType } from "reducers/recipes";

export function* uploadRecipeFlow() {
	while (true) {
		const { recipe } = yield take(recipesType.UPLOAD_RECIPE_REQUEST);
		// const formData = new FormData();
		// formData.append("image", data.image[0]);
		console.log(recipe);
	}
}

export default function* recipesSage() {
	yield all([fork(uploadRecipeFlow)]);
}
