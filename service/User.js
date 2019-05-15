"use strict";
const userRepo = require('../repository/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUser = () => {
    return new Promise((resolve, reject) => {
        userRepo.getDataByIdOrAll()
            .then((data) => {
                return resolve(data);
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.addUser = (userData) => {
    return new Promise((resolve, reject) => {
        userData.password = bcrypt.hashSync(userData.password, 10);
        userRepo.addUser(userData)
            .then((data) => {
                return resolve(data);
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.deleteUser = (userData) => {
    return new Promise((resolve, reject) => {
        userRepo.deleteUser(userData)
            .then((data) => {
                return resolve(data);
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.updateUser = (userData) => {
    return new Promise((resolve, reject) => {
        userRepo.updateUser(userData)
            .then((data) => {
                return resolve(data);
            })
            .catch((error) => {
                return reject(error);
            })
    });
}

exports.login = (userData) => {
    return new Promise((resolve, reject) => {
        userRepo.login(userData)
            .then((result) => {
                if (result) {
                    const JWTToken = jwt.sign({
                        email: userData.email,
                        _id: userData._id
                    }, 'secret',
                        {
                            expiresIn: '2h'
                        });
                    let data = {
                        success: result,
                        token_level_1: JWTToken
                    }
                    return resolve(data);
                }
            })
            .catch((error) => {
                return reject(error);
            })
    });
}