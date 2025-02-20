// NOTE TO SELF - TEST AND PUSH TO GITHUB BEFORE SATURDAY

const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Recipe.create({
    //   title: "Asian Glazed Chicken Thighs",
    //   level: "Amateur Chef",
    //   ingredients: [
    //     "1/2 cup rice vinegar",
    //     "5 tablespoons honey",
    //     "1/3 cup soy sauce (such as Silver Swan®)",
    //     "1/4 cup Asian (toasted) sesame oil",
    //     "3 tablespoons Asian chili garlic sauce",
    //     "3 tablespoons minced garlic",
    //     "salt to taste",
    //     "8 skinless, boneless chicken thighs",
    //   ],
    //   cuisine: "Asian",
    //   dishType: "main_course",
    //   image:
    //     "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   duration: 40,
    //   creator: "Chef LePapu",
    // }).then((recipe1) => {
    //   console.log(recipe1.title);
    // });
    Recipe.insertMany(data).then((newRecipes) => {
      console.log(newRecipes.title);
    });
  })
  .then(
    Recipe.findByIdAndUpdate(
      "/*Insert ID here*/",
      { duration: 100 },
      { new: true }
    ).then((updatedRecipe) => {
      console.log("Updated Recipe: ", updatedRecipe);
    })
  )
  .then(
    Recipe.findByIdAndDelete("/*Inset ID here*/").then((deletedRecipe) => {
      console.log("The following recipe has been deleted: ", deletedRecipe);
      return mongoose.disconnect();
    })
  )
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
