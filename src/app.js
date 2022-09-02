const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT ?? 3000;
const weatherApi = "3830673069b6f2106e2d1929130030dd";
const geocodeApi = "41da0e080fa975c3a297e12c85db115d";

// Define paths for express config
const static = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(static));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sebs Engel",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Sebs Engel",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    help: "This is some helpful text.",
    name: "Sebs Engel",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }
  geocode(
    geocodeApi,
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(weatherApi, latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location: location,
          // temperature: temperature,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found!",
    name: "Sebs Engel",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found!",
    title: "404",
    name: "Sebs Engel",
  });
});

app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});
