"use strict";
const userService = require('../service/User');
const constant = require('../constant.json');

/**
 * @function getAllUser
 * @method GET
 * @require token in header
 * @require not pameter
 */
exports.getAllUser = (req, res) => {
    userService.getAllUser()
        .then((result) => {
            res.status(constant.METHOD_CODE.SELECT);
            res.send(result);
        })
        .catch((error) => {
            switch (error.message) {
                case constant.ERROR_MESSAGES.USER_EMPTY:
                    res.status(413);
                    break;
                default:
                    res.status(500);
                    break;
            }
            res.send(error.message);
        });
}

/**
 * @function addUser
 * @method POST
 * @require not token in header
 * @require pameter UserName, Name, email, password
 */
exports.addUser = (req, res) => {
    userService.addUser(req.query)
        .then((result) => {
            res.status(constant.METHOD_CODE.INSERT);
            res.send(result);
        })
        .catch((error) => {
            switch (error.message) {
                case constant.ERROR_MESSAGES.DATA_NOT_INSERT:
                    res.status(413);
                    break;
                default:
                    res.status(500);
                    break;
            }
            res.send(error.message);
        });
}

/**
 * @function deleteUser
 * @method delete
 * @require token in header
 * @require _id(User object ID)
 */
exports.deleteUser = (req, res) => {
    userService.deleteUser(req.query)
        .then((result) => {
            res.status(constant.METHOD_CODE.DELETE);
            res.send(result);
        })
        .catch((error) => {
            switch (error.message) {
                case constant.ERROR_MESSAGES.DATA_NOT_DELETE:
                    res.status(413);
                    break;
                default:
                    res.status(500);
                    break;
            }
            res.send(error.message);
        });
}

/**
 * @function updateUser
 * @method put
 * @require token in header
 * @require _id(User object ID)
 */
exports.updateUser = (req, res) => {
    userService.updateUser(req.query)
        .then((result) => {
            res.status(constant.METHOD_CODE.UPDATE);
            res.send(result);
        })
        .catch((error) => {
            switch (error.message) {
                case constant.ERROR_MESSAGES.DATA_NOT_UPDATE:
                    res.status(413);
                    break;
                default:
                    res.status(500);
                    break;
            }
            res.send(error.message);
        });
}

/**
 * @function login
 * @method put
 * @require not token in header
 * @require emailID, password
 */
exports.login = (req, res) => {
    userService.login(req.query)
        .then((result) => {
            res.status(constant.METHOD_CODE.SELECT);
            res.send(result);
        })
        .catch((error) => {
            switch (error.message) {
                case constant.ERROR_MESSAGES.CREDENTIAL_NOT_MATCH:
                    res.status(413);
                    break;
                default:
                    res.status(500);
                    break;
            }
            res.send(error.message);
        });
}