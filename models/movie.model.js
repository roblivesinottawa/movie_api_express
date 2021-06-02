const sql = require("./db");

// definition of the constructor
const Movie = function(movie) {
  this.name = movie.name;
  this.release_year = movie.release_year;
  this.country = movie.country;
  this.watched = movie.watched;
};
// insert into the movie database
Movie.create = (newMovie, result) => {
  sql.query(`INSERT INTO movies_app SET ?`, newMovie, (err, res) => {
    if (err) {
      console.log(`There was an error creating movie, ${err}`);
      result(err, null);
      return;
    }
    console.log(`created movie: ${{ id: res.insertId, ...newMovie }}`);
    result(null, { id: res.insertId, ...newMovie });
  });
};

// find a movie by the specific id
Movie.findById = (movieId, result) => {
  sql.query(`SELECT * FROM  movies_app WHERE id = ${movieId}`, (err, res) => {
    if (err) {
      console.log(
        `There was an error retrieving a movie from the database, ${err}`,
      );
      result(err, null);
      return;
    }
    if (res.length) {
      console.log(`found movie, ${res[0]}`);
      result(null, res[0]);
      return;
    }

    result({ kind: "not found" }, null);
  });
};

// show all the movies stored in the database
Movie.getAll = (result) => {};

// update a movie using the specific id
Movie.updateById = (id, movie, result) => {};

// remove a movie with a specific id
Movie.remove = (id, result) => {};

// delete all movies from database
Movie.removeAll = (result) => {};
