"use strict";
const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/dbTest";

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.log('error: ', error);
  });