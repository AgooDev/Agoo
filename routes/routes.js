/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Module dependencies
 */
var logger = require('../config/logger').logger;
var moment = require('moment');

/**
 * setupRouter
 *
 * @description Configure all routes on express router
 *
 * @param {express.Router}      router      The varaible router used by the server
 */
function SetupRouter (router){

    // logger for all request will first hits this middleware
    router.use(function (req, res, next) {
        var now = moment(new Date());

        var date = now.format("DD-MM-YYYY HH:mm");
        logger.info('%s %s %s', req.method, req.url, date);
        next();
    });

    /**
     *  Declare all routes
     */
    var authRoutes = require('./auth');
    var clientRoutes = require('./clients');
    var oauth2Routes = require('./oauth2');
    var permissionRoutes = require('./permissions');
   // TODO: error en roles Cannot overwrite `Roles` model once compiled.
    //var rolRoutes = require('./roles');
    var userRoutes = require('./users');

    /**
     *  Document:  CLIENTS.JS
     *  Define routes where they are stored endpoints
     */
    /**
     *  Document:  OAUTH2.JS
     *  Create endpoint handlers for oauth2 authorize
     */
    /**
     *  Document:  PERMISSIONS.JS
     *  Define routes where they are stored endpoints
     */
    /**
     *  Document:  ROLES.JS
     *  Define routes where they are stored endpoints
     */
    /**
     *  Document:  USERS.JS
     *  Define routes where they are stored endpoints
     */
     * ====================================================================
     */
}

// Export the function that initialize all routes
module.exports.SetupRouter = SetupRouter;