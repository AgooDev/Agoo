/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Module dependencies.
 */
var logger = require('../config/logger').logger;
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

/**
 *  Required models.
 */
var UserDataModel = require('../models/users');
var User = UserDataModel.User;
var ClientDataModel = require('../models/clients');
var Client = ClientDataModel.Client;
var TokenDataModel = require('../models/tokens');
var Token = TokenDataModel.Token;
var Admin = require('../models/admins').Admin;

passport.use(new BasicStrategy(
    function(email, password, callback) {
        User.findOne({ email : email }, function (err, user) {
            if (err) {
                logger.error(err);
                return callback(err);
            }

            // No user found with that email
            if (!user) {
                Admin.findOne({ email: email }, function (err, admin) {
                    if (err) {
                        logger.error(err);
                        return callback(err);
                    }

                    // No admin found with that email
                    if(!admin){
                        return callback(null, false);
                    }

                    // Make sure the password is correct
                    admin.verifyPassword(password, function(err, isMatch) {
                        if (err) {
                            logger.error(err);
                            return callback(err);
                        }

                        // Password did not match
                        if (!isMatch) {
                            return callback(null, false);
                        }

                        // Success
                        return callback(null, admin);
                    });
                });
            } else {
                // Make sure the password is correct
                user.verifyPassword(password, function(err, isMatch) {
                    if (err) {
                        logger.error(err);
                        return callback(err);
                    }

                    // Password did not match
                    if (!isMatch) {
                        return callback(null, false);
                    }

                    // Success
                    return callback(null, user);
                });
            }
        });
    }
));

passport.use('Login-Basic',new BasicStrategy(
    function(email, password, callback) {
        User.findOne({ email : email }, function (err, user) {
            if (err) {
                logger.error(err);
                return callback(err);
            }

            // No user found with that email
            if (!user) {
                return callback(null, false);
            }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) {
                    logger.error(err);
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {

                    return callback(null, false);

                }

                // Success
                return callback(null, user);
            });
        });
    }
));

passport.use('Admin-Basic', new BasicStrategy(
    function(email, password, callback) {
        Admin.findOne({ email : email }, function (err, admin) {
            if (err) {
                logger.error(err);
                return callback(err);
            }

            // No user found with that email
            if (!admin) {
                return callback(null, false);
            }

            // Make sure the password is correct
            admin.verifyPassword(password, function(err, isMatch) {
                if (err) {
                    logger.error(err);
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {
                    return callback(null, false);
                }

                // Success
                return callback(null, admin);
            });
        });
    }
));

passport.use('Admin-Login-Basic',new BasicStrategy(
    function(email, password, callback) {
        Admin.findOne({ email : email }, function (err, admin) {
            if (err) {
                logger.error(err);
                return callback(err);
            }

            // No user found with that email
            if (!admin) {
                return callback(null, false);
            }

            // Make sure the password is correct
            admin.verifyPassword(password, function(err, isMatch) {
                if (err) {
                    logger.error(err);
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {

                    return callback(null, false);

                }

                // Success
                return callback(null, admin);
            });
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function(email, password, callback) {
        Client.findOne({ id: email }, function (err, client) {
            if (err) {
                logger.error(err);
                return callback(err);
            }

            // No client found with that id or bad password
            if (!client || client.secret !== password) {
                return callback(null, false);
            }

            // Success
            return callback(null, client);
        });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, callback) {
        Token.findOne({ value: accessToken }, function (err, token) {
            if (err) {
                logger.error(err);
                return callback(err);
            }

            // No token found
            if (!token) {
                return callback(null, false);
            }

            User.findOne({ _id: token.idUser }, function (err, user) {
                if (err){
                    logger.error(err);
                    return callback(err);
                }

                // No user found
                if (!user) {
                    return callback(null, false);
                }

                // Simple example with no scope
                // TODO: verificar el alcance de la respuesta de la BearerStrategy
                callback(null, user, { scope: '*' });
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isAdminAuthenticated = passport.authenticate(['Admin-Basic', 'bearer'], { session : false });
exports.isLoginAuthenticated = passport.authenticate(['Login-Basic', 'bearer'], { session : false });
exports.isAdminLoginAuthenticated = passport.authenticate(['Admin-Login-Basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
