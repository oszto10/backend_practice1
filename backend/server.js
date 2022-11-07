const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.get("/beers", (req, res) => {
  fs.readFile(`${__dirname}/data/data.json`, (err, data) => {
    if (err) {
      console.log("hiba, err");
      res.status(500).send("hibavan");
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get("/beers/:id", (req, res) => {
  let paramId = parseInt(req.params.id);
  let response = "beer not found";
  fs.readFile(`${__dirname}/data/data.json`, (err, data) => {
    if (err) {
      console.log("hiba, err");
      res.status(500).send("error at reading file");
    } else {
      const beerData = JSON.parse(data);

      beerData.forEach((beer) => {
        if (beer.id === paramId) {
          response = beer;
        }
      });

      return res.send(response);
    }
  });
});

app.listen(2022, console.log(`http://127.0.0.1:2022`));
