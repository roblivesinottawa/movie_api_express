const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "Welcome to the movie app." }));

require("./routes/movie.routes");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app running at localhost:${PORT}`));
