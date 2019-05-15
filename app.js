"use strict";
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const jwt = require('jsonwebtoken');
require('./connection');

// add here all API which dont need the token
const OPEN_APIs = ['/login'];

const indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');

  if (OPEN_APIs.includes(request.path)) {
    next();
  } else {
    next();
    // const token = request.header('token_level_1');
    // if (token) {
    //   jwt.verify(token, 'secret', function (error, success) {
    //     if (error) {
    //       const err = new Error("Please provide correct token in header");
    //       err.status = 413;
    //       next(err);
    //     }
    //     next();
    //   });
    // } else {
    //   const err = new Error("Please set token in header");
    //   err.status = 413;
    //   next(err);
    // }
  }

})

app.use(indexRouter);

// Default error handler
app.use((err, req, res, next) => {

  res.status(err.hasOwnProperty('status') ? err.status : 500);
  res.json({
    message: err.hasOwnProperty('errors') ? err.errors : err.toString()
  });
});

module.exports = app;
