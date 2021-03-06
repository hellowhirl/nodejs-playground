const express = require("express");
const app = express();

app.use(express.json()); // adding a piece of middleware - then we use it in request processing pipeline

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Drama" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Documentary" },
];

app.get("/", (req, res) => {
  res.send("Hey low Gaia");
});

app.get("/vidly.com/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/vidly.com/api/genres", (req, res) => {
  if (!req.body.name) return res.status(404).send("Genre name is required");

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

app.put("/vidly.com/api/genres/:id", (req, res) => {
  if (!req.body.name) return res.status(404).send("Genre name is required");

  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  if (!genre) res.status(404).send("id does not exist");

  genre.name = req.body.name;
  console.log(req.body);
  console.log(genre);

  res.send(genre);
});

app.delete("/vidly.com/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  if (!genre) res.status(404).send("id does not exist");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});

const port = process.env.port || 4000;
app.listen(port, () => console.log(`Now listening on port ${port}`));
