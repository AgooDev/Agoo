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
        // ENDPOINT: /clients
    router.route('/clients')
        .get(authRoutes.isAuthenticated, clientRoutes.getClientByIdClient)
        .post(authRoutes.isAuthenticated, clientRoutes.postClient);

    // ENDPOINT: /clients/:id
    router.route('/clients/:id')
        .delete(authRoutes.isAuthenticated, clientRoutes.deleteClient);
    /**
     * ====================================================================
     */


    /**
     *  Document:  OAUTH2.JS
     *  Create endpoint handlers for oauth2 authorize
     */
        // ENDPOINT: /oauth2/authorize
    router.route('/oauth2/authorize')
        .get(authRoutes.isAuthenticated, oauth2Routes.authorization)
        .post(authRoutes.isAuthenticated, oauth2Routes.decision);

    // ENDPOINT: /oauth2/token
    router.route('/oauth2/token')
        .post(authRoutes.isClientAuthenticated, oauth2Routes.token);
    /**
     * ====================================================================
     */


    /**
     *  Document:  PERMISSIONS.JS
     *  Define routes where they are stored endpoints
     */
        // ENDPOINT: /permissions
    router.route('/permissions')
        .get(authRoutes.isAuthenticated, permissionRoutes.getPermissions)
        .post(authRoutes.isAuthenticated, permissionRoutes.postPermission);

    // ENDPOINT: /permissions/:id
    router.route('/permissions/:id')
        .get(authRoutes.isAuthenticated, permissionRoutes.getPermissionById)
        .put(authRoutes.isAuthenticated, permissionRoutes.putPermission)
        .patch(authRoutes.isAuthenticated, permissionRoutes.patchPermission)
        .delete(authRoutes.isAuthenticated, permissionRoutes.deletePermission);
    /**
     * ====================================================================
     */


    /**
     *  Document:  ROLES.JS
     *  Define routes where they are stored endpoints
     */
        // ENDPOINT: /roles
    //router.route('/roles')
    //    .get(authRoutes.isAuthenticated, rolRoutes.getRoles)
    //    .post(authRoutes.isAuthenticated, rolRoutes.postRol);

    // ENDPOINT: /roles/:id
    //router.route('/roles/:id')
    //    .get(authRoutes.isAuthenticated, rolRoutes.getRolById)
    //    .put(authRoutes.isAuthenticated, rolRoutes.putRol)
    //    .patch(authRoutes.isAuthenticated, rolRoutes.patchRol)
    //    .delete(authRoutes.isAuthenticated, rolRoutes.deleteRol);
    /**
     * ====================================================================
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