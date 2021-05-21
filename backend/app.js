const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

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
    "GET, POST, PATCH,DELETE,OPTIONS"
  );

  next();
});

//POST APIS
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "post added successfully",
      postId: createdPost._id,
    });
  });
});

//GET APIS
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "post fetched successfully",
      posts: documents,
    });
  });
});

//DELETE APIS
app.delete("/api/posts/:id", (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "post deleted successfully",
    });
  });
});

module.exports = app;
