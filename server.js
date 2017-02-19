/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Environment variables.
 */

require('dotenv').config();

/**
 * Module dependencies.
 */
var express             = require('express'),
    bodyParser          = require('body-parser'),
    errorhandler        = require('errorhandler'),
    favicon             = require('serve-favicon'),
    jade                = require('jade'),
    methodOverride      = require('method-override'),
    moment              = require('moment'),
    path                = require('path'),
    session             = require('express-session'),
    passport            = require('passport'),

    logger              = require('./config/logger').logger,
    morgan              = require('morgan'),

    mongodb             = require('./config/mongodb'),
    routes              = require('./routes/api'),
    port                = process.env.API_PORT;

logger.info('Enviroment: ' + process.env.API_ENV);

// MongoDB connection
mongodb.SetupMongoDB(process.env.MONGODB_URI, process.env.MONGODB_NAME);

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

// Logger.
// TODO: Arreglar el error entre wiston y morgan
//app.use(morgan('combined', { 'stream': logger.stream }));
app.use(morgan('dev'));

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride());

// Set Header 'X-Prowered-By'
logger.info('Agoo.com.co');
app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Agoo.com.co < info@agoo.com.co >');
    next();
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Import static files.
app.use(express.static(path.join(__dirname, 'public')));

// Session.
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '3f1l 4 73g 0t d33n yll43r u s1ht d43r n4c u f1'
}));

// Use the passport package in our application
app.use(passport.initialize());

// Local variables.
// Current year.
app.locals.currentYear = moment().year();
app.locals.currentEnvironment = process.env.API_ENV;

//ROUTER
//Create our Express router
var router  = express.Router();

// Setup all routes on express router
routes.SetupRouter(router);

// Register all our routes with a prefix: /api or /v1
// This poject is created to be hosted in a subdomain dedicated to authentication and authorization
// Example of an URL with the prefix: auth.happyauth.com/v0
app.use('/' + process.env.API_VERSION, router);

// Error handler available environment
if (process.env.API_ENV === 'development'){
    app.use(errorhandler());
}

// Start the server
app.listen(port);
logger.info('API running on http://localhost:' + port + '/' + process.env.API_VERSION + '/');