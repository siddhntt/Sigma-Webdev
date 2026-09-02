const express = require("express");
const app = express();

let port = 8080;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("you contacted root path");
});

app.get("/:username/:id", (req, res) => {
  console.log(req.params);
  let { username, id } = req.params;
  res.send(`Welcome to the page of @${username}.`);
});

app.get("/search", (req, res) => {
  console.log(req.query);
  res.send("no result");
});
