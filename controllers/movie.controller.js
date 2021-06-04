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
      ? res.status(500).send({
          message: err.message || `An error occurred while creating movie`,
        })
      : res.send(data),
  );
};

exports.findAll = (req, res) => {
  Movie.getAll((err, data) => {
    err
      ? res.status(500).send({
          message: err.message || `An error occurred while retrieving movies`,
        })
      : res.send(data);
  });
};
exports.findOne = (req, res) => {
  Movie.findById(req.params.movieId, (err, data) => {
    if (err) {
      err.kind == "not found"
        ? res
            .status(404)
            .send({ message: `Not found movie with id ${req.params.movieId}.` })
        : res.status(500).send({
            message: `Error retrieving movie with id ${req.params.movieId}`,
          });
    } else res.send(data);
  });
};
exports.update = (req, res) => {
  if (!req.body) res.status(400).send({ message: `Content cannot be empty!` });

  Movie.updateById(req.params.movieId, new Movie(req.body), (err, data) => {
    if (err) {
      err.kind == "not found"
        ? res
            .status(404)
            .send({ message: `Not found movie with id ${req.params.movieId}.` })
        : res.status(500).send({
            message: `Error retrieving movie with id ${req.params.movieId}`,
          });
    } else res.send(data);
  });
};
exports.delete = (req, res) => {
  Movie.remove(req.params.movieId, (err, data) => {
    if (err) {
      err.kind == "not found"
        ? res
            .status(404)
            .send({ message: `Not found movie with id ${req.params.movieId}.` })
        : res.status(500).send({
            message: `Could not delete movie with id ${req.params.movieId}`,
          });
    } else res.send({ message: `Movie was successfully deleted` });
  });
};
exports.deleteAll = (req, res) => {
  Movie.removeAll((err, data) => {
    err
      ? res
          .status(500)
          .send({
            message:
              err.message || `An error occurred when removing all movies.`,
          })
      : res.send({
          message: `All movies were deleted successfully.`,
        });
  });
};
