const express = require("express");
const app = express();
const port = 4000;

app.use(express.json()); // adding a piece of middleware - then we use it in request processing pipeline

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Drama" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Documentary" },
];

app.get("/vidly.com/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/vidly.com/api/genres", (req, res) => {
  console.log("incoming request:", req.body.name);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);

  res.send(genre);
  // const index = genres.indexOf(genre);
  // if (!index) return res.send("Genre ID does not exist");
});

app.listen(port, () => console.log(`Now listening on port${port}`));
