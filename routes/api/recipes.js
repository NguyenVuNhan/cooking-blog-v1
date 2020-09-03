const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import validator
const validateRecipeAdd = require("../../validations/recipeAdd");

// Import services
const { uploadImage, deleteImage } = require("../../services/image-uploader");

// Load models
const Recipe = require("../../models/Recipe");
const User = require("../../models/User");

// @route 	GET api/recipes/test
// @desc  	Tests route
// @access	Public
router.get("/test", (req, res) => res.json({ msg: "recipes works" }));

// @route 	GET api/recipes
// @desc  	Get all recipe
// @access	Public
router.get("/", (req, res) => {
  Recipe.find({})
    .select({ "image.link": 1, name: 1, steps: 1 })
    .populate("user", ["name", "avatar"])
    .populate("course", ["name", "image.link"])
    .populate({
      path: "ingredients",
      populate: {
        path: "ingredient",
        select: "name image.link",
      },
    })
    .then((recipes) => {
      if (!recipes) {
        return res.status(404).json({
          error: "Recipe not found",
          success: false,
        });
      }

      return res.json({ recipes, success: true });
    })
    .catch((err) =>
      res.status(400).json({
        error: "Unexpected error while find recipe",
        success: false,
      })
    );
});

// @route 	GET api/recipes/recipe?id=&name=
// @desc  	Get recipe by id or name
// @access	Public
router.get("/recipe", (req, res) => {
  const { id, name } = req.query;
  let query;

  if (id) {
    query = Recipe.findById(id);
  } else if (name) {
    query = Recipe.findOne({ name: { $regex: name, $options: "i" } });
  } else {
    return res.status(400).json({
      error: "Expected id or name",
      success: false,
    });
  }

  query
    .populate("user", ["name", "avatar"])
    .populate("course", ["name", "image.link"])
    .populate({
      path: "ingredients",
      populate: {
        path: "ingredient",
        select: "name image.link",
      },
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          error: "Recipe not found",
          success: false,
        });
      }

      return res.json({ recipe, success: true });
    })
    .catch((err) =>
      res.status(400).json({
        error: "Unexpected error while find recipe",
        success: false,
      })
    );
});

// @route 	DELETE api/recipes/:id
// @desc  	Delete recipe
// @access	Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            error: "Recipe not found",
            success: false,
          });
        }

        if (recipe.user.toString() !== req.user.id) {
          return res.status(401).json({
            notAuthorized: "User not authorized",
            success: false,
          });
        }

        let deleteImagePromises = [];
        deleteImagePromises.push(deleteImage(recipe.image.deletehash));
        recipe.steps.forEach((step) =>
          deleteImagePromises.push(deleteImage(step.image.deletehash))
        );

        Promise.all(deleteImagePromises)
          .then((data) =>
            Recipe.findByIdAndRemove(req.params.id, {
              useFindAndModify: false,
            })
          )
          .then((deletedRecipe) =>
            User.findByIdAndUpdate(req.user.id, {
              $pull: { recipes: deletedRecipe._id },
            })
          )
          .then((user) => res.json({ user, success: true }))
          .catch((err) =>
            res.status(400).json({
              err,
              error: "Unexpected error while delete recipe",
              success: false,
            })
          );
      })
      .catch((err) =>
        res.status(400).json({
          error: "Unexpected error while find recipe",
          success: false,
        })
      );
  }
);

// @route 	PUT api/recipes/:id
// @desc  	Edit recipe
// @access	Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, course, ingredients, image, duration, steps } = req.body;

    Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            error: "Recipe not found",
            success: false,
          });
        }

        if (recipe.user.toString() !== req.user.id) {
          return res.status(401).json({
            notAuthorized: "User not authorized",
            success: false,
          });
        }

        const newRecipe = {
          ...(name && { name }),
          ...(course && { course }),
          ...(ingredients && { ingredient }),
          ...(image && { image }),
          ...(duration && { duration }),
          ...(steps && { steps }),
        };

        Recipe.findByIdAndUpdate(
          req.params.id,
          { $set: newRecipe },
          { new: true, useFindAndModify: false }
        )
          .then((updatedRecipe) => res.json({ updatedRecipe, success: true }))
          .catch((err) =>
            res.status(400).json({
              error: "Unexpected error while update recipe",
              success: false,
            })
          );
      })
      .catch((err) =>
        res.status(400).json({
          error: "Unexpected error while find recipe",
          success: false,
        })
      );
  }
);

// @route 	POST api/recipes/
// @desc  	Add new recipe
// @access	Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, course, ingredients, image, duration, steps } = req.body;

    const { errors, isValid } = validateRecipeAdd(req.body);
    if (!isValid) {
      return res.status(400).json({ errors, success: false });
    }

    Recipe.findOne({ name })
      .then((recipe) => {
        if (recipe) {
          return res.status(400).json({
            error: "Recipe name already exist",
            success: false,
          });
        }

        const newRecipe = new Recipe({
          name,
          user: req.user.id,
          course,
          ingredients,
          image,
          duration,
          steps,
        });

        newRecipe
          .save()
          .then((savedRecipe) =>
            User.findByIdAndUpdate(
              req.user.id,
              { $push: { recipes: savedRecipe } },
              { new: true, useFindAndModify: false }
            )
          )
          .then((updatedUser) =>
            res.json({
              updatedUser,
              success: true,
            })
          )
          .catch((err) =>
            res.status(400).json({
              error: "Unexpected error while save recipe",
              success: false,
            })
          );
      })
      .catch((err) =>
        res.status(400).json({
          error: "Unexpected error while validate recipe",
          success: false,
        })
      );
  }
);

module.exports = router;
