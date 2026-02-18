import mongoose from "mongoose";
 
const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

//set up Schema and model
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String,
}); //, { collection: "myPetCollection" }); //if you want to use a different collection other than the default "pets" which would be used because the lowercase, plural form of "Pet" (below) is "pets"
const Movie = mongoose.model("Movie", movieSchema);

await mongoose.connect(dbUrl); //if your connection string has a user, you must use await (it's synchronous only for connection strings with no user)

//MONGODB FUNCTIONS
//On initial page load, if there's nothing in the pets collection, initialize with some data
async function initializeMovies() {
  let movieArray = [
    {
      title: "The Godfather",
      year: 1975,
      rating: "G",
    },
    {
      title: "Schindler's List",
      year: 1993,
      rating: "R",
    },
    {
    title: "The Dark Knight",
      year: 2008,
      rating: "D",
    }
  ];
  await Movie.insertMany(movieArray);
}

//Get all movies from the movies collection
async function getMovie() {
  return await Movie.find({}); //return array for find all
}

//Add a movie to the movies collection
async function addMovie(title, year, rating) {
  let newMovie = new Movie({
    title: String(title),
    year: Number(year),
    rating: String(rating),
   
  });
  await newMovie.save(); //save the new movie to the DB
}

//Function to update pet name
async function updateMovieRating(title, newRating) {
  await Movie.updateOne(
    { title: String(title) },
    { $set:{rating: String(newRating)} }
  );
}

//Function to delete the first matching movie by name
async function deleteMovieByRating(rating) {
  await Movie.deleteMany({ rating: String(rating) });
}

export default {
  initializeMovies,
  getMovie,
  addMovie,
  updateMovieRating,
  deleteMovieByRating,
}