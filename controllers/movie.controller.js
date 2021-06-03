const Movie = require("../models/movie.model");

exports.create = (req, res) => {
  if (!req.body) res.status(400).send({ message: `Content cannot be empty!` });

  const movie = new Movie({
    name: req.body.name,
    release_year: req.body.release_year,
    country: req.body.country,
    watched: req.body.watched,
  });

  Movie.create(movie, (err, data) =>
    err
      ? res
          .status(500)
          .send({
            message: err.message || `An error occurred while creating movie`,
          })
      : res.send(data),
  );
};

exports.findAll = (req, res) => {};
exports.findOne = (req, res) => {};
exports.update = (req, res) => {};
exports.delete = (req, res) => {};
exports.deleteAll = (req, res) => {};
