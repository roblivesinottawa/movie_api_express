module.exports = (app) => {
  const movies = require("../controllers/movie.controller");

  app.post("/movies", movies.create);
  app.get("/movies", movies.findAll);
  app.get("/movies/:movieId", movies.findOne);
  app.put("/movies/:movieId", movies.update);
  app.delete("/movies/:movieId", movies.delete);
  app.delete("/movies", movies.deleteAll);
};
