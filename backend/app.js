const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");

//Starting the App
const app = express();

//Database connection
mongoose
  .connect(
    "mongodb+srv://tuqa:UpFqODNhCPLCUnXf@cluster0.f3zmv.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!!");
  })
  .catch(() => {
    console.log("error");
  });

//CORS issue solution
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH,DELETE,OPTIONS"
  );

  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;
