import Recipe from "../models/Recipe.js";
import User from "../models/User.js";
export const getAllRecipes = async (req, res) => {
  try {
    const { user } = req.body;

    // search user by id
    if (user) {
      const user1 = await User.findById(user._id);
      const recipes = await Recipe.find({ id: { $in: user1.recipes } }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        status: "success",
        results: recipes.length,
        data: {
          recipes,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
export const rateRecipe = async (req, res) => {
  try {
    const { recipe } = req.body;
    // search and update recipe by id
    const recipe1 = await Recipe.findOne({ id: recipe.id });
    recipe1.rating = recipe.rating;
    await recipe1.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      data: {
        recipe1,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
export const createRecipe = async (req, res) => {
  try {
    const { recipe, user, instanceDetails } = req.body;

    const recipe1 = await Recipe.create({
      id: recipe.id,
      title: recipe.title,
      directions: recipe.directions,
      ingredients: recipe.ingredients,
      requestedIngredients: instanceDetails.ingredients,
      allergies: user.foodPreferences.allergies,
      diet_type: user.foodPreferences.dietPreference[0],
    });
    const user1 = await User.findById(user);
    user1.recipes.push(recipe.id);
    await user1.save({ validateBeforeSave: false });
    res.status(201).json({
      status: "success",
      data: {
        recipe1,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
export const deleteRecipe = async (req, res) => {
  try {
    //delete recipe
    await Recipe.findByIdAndDelete(req.params.id);
    // remove from user array

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
export const deleteAllRecipes = async (req, res) => {
  try {
    //get id of recipes from user
    const { user } = req.body;
    const user1 = await User.findById(user._id);

    //delete all recipes
    await Recipe.deleteMany({ id: { $in: user1.recipes } });
    // remove from user array
    user1.recipes = [];
    await user1.save({ validateBeforeSave: false });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
