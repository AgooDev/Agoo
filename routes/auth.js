/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

// Load required models
var UserDataModel = require('../models/users');
var User = UserDataModel.User;
var ClientDataModel = require('../models/clients');
var Client = ClientDataModel.Client;
var TokenDataModel = require('../models/tokens');
var Token = TokenDataModel.Token;

passport.use(new BasicStrategy(
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

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isLoginAuthenticated = passport.authenticate(['Login-Basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
