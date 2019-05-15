"use strict";
const UserModel = require('../models/UserModel');
const constant = require('../constant.json');
const bcrypt = require('bcrypt');

exports.getDataByIdOrAll = () => {
    return new Promise((resolve, reject) => {
        UserModel.user.find({ is_registered: true })
            .then((data) => {
                if (data && data.length) {
                    return resolve(data);
                } else {
                    throw new Error(constant.ERROR_MESSAGES.USER_EMPTY);
                }
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.addUser = (userData) => {
    return new Promise((resolve, reject) => {
        UserModel.user.create(userData)
            .then((data) => {
                if (data) {
                    return resolve(data);
                } else {
                    throw new Error(constant.ERROR_MESSAGES.DATA_NOT_INSERT);
                }
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.deleteUser = (userData) => {
    console.log('userData: ', userData);
    return new Promise((resolve, reject) => {
        userData.is_registered = false;
        userData.de_registration = new Date();

        UserModel.user.updateOne({ _id: userData._id }, userData)
            .then((data) => {
                if (data && data.nModified) {
                    return resolve(data);
                } else {
                    throw new Error(constant.ERROR_MESSAGES.DATA_NOT_DELETE);
                }
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.updateUser = (userData) => {
    return new Promise((resolve, reject) => {
        userData.updated_at = new Date();
        // delete userData["email_address"];

        UserModel.user.updateOne({ _id: userData._id }, userData)
            .then((data) => {
                if (data && data.nModified) {
                    return resolve(data);
                } else {
                    throw new Error(constant.ERROR_MESSAGES.DATA_NOT_UPDATE);
                }
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.login = (userData) => {
    return new Promise((resolve, reject) => {
        UserModel.user.findOne({ 'email_address': userData.email_address })
            .then((data) => {
                if (data) {
                    return bcrypt.compare(userData.password, data.password)
                } else {
                    throw new Error(constant.ERROR_MESSAGES.CREDENTIAL_NOT_MATCH);
                }
            })
            .then((result) => {
                if (result) {
                    return resolve(result);
                } else {
                    throw new Error(constant.ERROR_MESSAGES.PASSWORD_NOT_MATCH);
                }
            })
            .catch((error) => {
                return reject(error);
            })
    });
}