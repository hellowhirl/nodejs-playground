const express = require("express");
const app = new express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hellow");
});

app.listen(port, () => console.log(`Now listening on port${port}`));
