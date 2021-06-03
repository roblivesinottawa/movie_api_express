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
Movie.getAll = (result) => {
  sql.query(`SELECT * FROM movies_app`, (req, res) => {
    if (err) {
      console.log(`could not get all movies from database ${err}`);
      result(null, err);
      return;
    }

    console.log(`movies, ${res}`);
    result(null, res);
  });
};

// update a movie using the specific id
Movie.updateById = (id, movie, result) => {
  sql.query(
    `UPDATE movie_app SET name = ?, release_year = ?, country = ?, watched = ? WHERE id = ?`,
    [movie.name, movie.release_year, movie.country, movie.watched],
    (err, res) => {
      if (err) {
        console.log(`could not update movie, ${err}`);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: `not found` }, null);
        return;
      }
      console.log(`Updated movie: ${{ id: id, ...movie }}`);
      result(null, { id: id, ...customer });
    },
  );
};

// remove a movie with a specific id
Movie.remove = (id, result) => {
  sql.query(
    `
  DELETE FROM movies_app WHERE id = ?`,
    id,
    (err, res) => {
      if (err) {
        console.log(`Could not delete movie, ${err}`);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: `not found` }, null);
        return;
      }
      console.log(`Deleted movie with id: ${id}`);
      result(null, res);
    },
  );
};

// delete all movies from database
Movie.removeAll = (result) => {
  sql.query(
    `
  DELETE FROM movies_app`,
    (err, res) => {
      if (err) {
        console.log(`Could not delete movies, ${err}`);
        result(null, err);
        return;
      }
      console.log(`Deleted ${res.affectedRows} movies`);
      result(null, res);
    },
  );
};

module.exports = Movie;
