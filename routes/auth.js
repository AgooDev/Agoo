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
