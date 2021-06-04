const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "Welcome to the movie app." }));

require("./routes/movie.routes")(app);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`app running at localhost:${PORT}`));
