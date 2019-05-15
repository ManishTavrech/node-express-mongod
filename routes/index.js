"use strict";
var express = require('express');
var router = express.Router();

const userController = require('../controller/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
/**
 * User CRUD operation
 */
router.get('/user', userController.getAllUser);
router.post('/user', userController.addUser);
router.delete('/user', userController.deleteUser);
router.put('/user', userController.updateUser);

router.post('/login', userController.login);

module.exports = router;