import "dotenv/config";
import express from "express";
import path from "path";

import db from "./components/movies/db.js"; 

const __dirname = import.meta.dirname;

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let movieList = await db.getMovie();
  //if there's nothing in the pets collection, initialize with some content then get the pets again
  if (!movieList.length) {
    await db.initializeMovies(); 
    movieList = await db.getMovie();
  }
  response.render("index", { movies: movieList });
});
app.get("/add", async (request, response) => {
  //add a movie
  await db.addMovie("The Shawshank Redemption", 1994, "R");
  response.redirect("/");
});
app.get("/update", async (request, response) => {
  //update something
  await db.updateMovieRating("The Godfather", "PG-13");
  response.redirect("/");
});
app.get("/delete", async (request, response) => {
  await db.deleteMovieByRating("R");
  response.redirect("/");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

