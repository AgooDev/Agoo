/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

//
// Module dependencies
//
var express             = require('express'),
    bodyParser          = require('body-parser'),
    favicon             = require('serve-favicon'),
    jade                 = require('jade'),
    methodOverride      = require('method-override'),
    moment              = require('moment'),
    path                = require('path'),
    session             = require('express-session'),
    passport            = require('passport'),

    logger              = require('./config/logger').logger,
    morgan              = require('morgan'),

    routes              = require('./routes/routes'),

    environment         = 'devLocal',
    config              = require('./config/environment.json')[environment],
    port                = config.port;

logger.info('Enviroment: ' + environment);

// MongoDB connection
var mongoDB = require('./config/mongodb');
mongoDB.setupMongoDB(config.MongoDB);

// Express app instance
var app = express();

// Load configuration, package and environment to the new express app.
// Port.
app.set('port', port);

// Config views and template engine.
// Use `.hbs` for extensions and find partials in `views/partials`.
app.set('view engine', 'jade');

// Favicon path.
app.use(favicon(__dirname + '/public/img/favicon.ico'));


// Path to our public directory
app.use(express.static(__dirname + '/public'));

//ROUTER
//Create our Express router
var router  = express.Router();

// Setup all routes on express router
routes.SetupRouter(router);

// Register all our routes with a prefix: /api or /v1
// This poject is created to be hosted in a subdomain dedicated to authentication and authorization
// Example of an URL with the prefix: auth.happyauth.com/v0
app.use(config.version, router);

// Start the server
app.listen(port);
logger.info('API running on http://localhost:' + port + config.version + '/');