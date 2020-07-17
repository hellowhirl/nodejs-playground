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

app.get("/", (req, res) => {
  res.send("Hey low Gaia");
});

app.get("/vidly.com/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/vidly.com/api/genres", (req, res) => {
  console.log("incoming request:", req.body);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);

  res.send(genre);
  // const index = genres.indexOf(genre);
  // if (!index) return res.send("Genre ID does not exist");
});

app.put("/vidly.com/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  // genre.id = req.params.id;
  genre.name = req.body.name;
  console.log(req.body);
  console.log(genre);

  // genres[index].name = req.body.name;
  // console.log(genres);

  res.send(genre);
});

app.delete("/vidly.com/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  const index = genres.indexOf(genre);
  console.log("index", typeof index, index);
  console.log(genres);
  genres.splice(index, 1);
  console.log(genres);

  res.send(genres);
});

app.listen(port, () => console.log(`Now listening on port ${port}`));
