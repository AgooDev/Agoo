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
    var cityRoutes = require('./cities');
    var clientRoutes = require('./clients');
    var contentTypeRoutes = require('./contentTypes');
    var countryRoutes = require('./countries');
    var lessonRoutes = require('./lessons');
    var courseRoutes = require('./courses');
    var currencyRoutes = require('./currencies');
    var oauth2Routes = require('./oauth2');
    var permissionRoutes = require('./permissions');
    var programRoutes = require('./programs');
    var roleRoutes = require('./roles');
    var stateRoutes = require('./states');
    var userRoutes = require('./users');

    /**
     *  Document:  CITIES.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /cities
    router.route('/cities')
        .get(authRoutes.isAuthenticated, cityRoutes.getCities)
        .post(authRoutes.isAuthenticated, cityRoutes.postCity);

    // ENDPOINT: /cities/:id
    router.route('/cities/:id')
        .get(authRoutes.isAuthenticated, cityRoutes.getCityById)
        .put(authRoutes.isAuthenticated, cityRoutes.putCity)
        .patch(authRoutes.isAuthenticated, cityRoutes.patchCity)
        .delete(authRoutes.isAuthenticated, cityRoutes.deleteCity);
    /**
     * ====================================================================
     */


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
     *  Document:  CONTENTTYPES.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /types/content
    router.route('/types/content')
        .get(authRoutes.isAuthenticated, contentTypeRoutes.getContentTypes)
        .post(authRoutes.isAuthenticated, contentTypeRoutes.postContentType);

    // ENDPOINT: /types/content/:id
    router.route('/types/content/:id')
        .get(authRoutes.isAuthenticated, contentTypeRoutes.getContentTypeById)
        .put(authRoutes.isAuthenticated, contentTypeRoutes.putContentType)
        .patch(authRoutes.isAuthenticated, contentTypeRoutes.patchContentType)
        .delete(authRoutes.isAuthenticated, contentTypeRoutes.deleteContentType);
    /**
     * ====================================================================
     */


    /**
     *  Document:  COUNTRIES.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /countries
    router.route('/countries')
        .get(authRoutes.isAuthenticated, countryRoutes.getCountries)
        .post(authRoutes.isAuthenticated, countryRoutes.postCountry);

    // ENDPOINT: /countries/:id
    router.route('/countries/:id')
        .get(authRoutes.isAuthenticated, countryRoutes.getCountryById)
        .put(authRoutes.isAuthenticated, countryRoutes.putCountry)
        .patch(authRoutes.isAuthenticated, countryRoutes.patchCountry)
        .delete(authRoutes.isAuthenticated, countryRoutes.deleteCountry);
    /**
     * ====================================================================
     */


    /**
     *  Document:  COURSELEVELS.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /lessons
    router.route('/lessons')
        .get(authRoutes.isAuthenticated, lessonRoutes.getCourseLessons)
        .post(authRoutes.isAuthenticated, lessonRoutes.postCourseLesson);

    // ENDPOINT: /lessons/:id
    router.route('/lessons/:id')
        .get(authRoutes.isAuthenticated, lessonRoutes.getCourseLessonById)
        .put(authRoutes.isAuthenticated, lessonRoutes.putCourseLesson)
        .patch(authRoutes.isAuthenticated, lessonRoutes.patchCourseLesson)
        .delete(authRoutes.isAuthenticated, lessonRoutes.deleteCourseLesson);
    /**
     * ====================================================================
     */


    /**
     *  Document:  COURSES.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /courses
    router.route('/courses')
        .get(authRoutes.isAuthenticated, courseRoutes.getCourses)
        .post(authRoutes.isAuthenticated, courseRoutes.postCourse);

    // ENDPOINT: /courses/:id
    router.route('/courses/:id')
        .get(authRoutes.isAuthenticated, courseRoutes.getCourseById)
        .put(authRoutes.isAuthenticated, courseRoutes.putCourse)
        .patch(authRoutes.isAuthenticated, courseRoutes.patchCourse)
        .delete(authRoutes.isAuthenticated, courseRoutes.deleteCourse);
    /**
     * ====================================================================
     */


    /**
     *  Document:  CURRENCIES.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /currencies
    router.route('/currencies')
        .get(authRoutes.isAuthenticated, currencyRoutes.getCurrencies)
        .post(authRoutes.isAuthenticated, currencyRoutes.postCurrency);

    // ENDPOINT: /currencies/:id
    router.route('/currencies/:id')
        .get(authRoutes.isAuthenticated, currencyRoutes.getCurrencyById)
        .put(authRoutes.isAuthenticated, currencyRoutes.putCurrency)
        .patch(authRoutes.isAuthenticated, currencyRoutes.patchCurrency)
        .delete(authRoutes.isAuthenticated, currencyRoutes.deleteCurrency);
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
     *  Document:  PROGRAMS.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /programs
    router.route('/programs')
        .get(authRoutes.isAuthenticated, programRoutes.getPrograms)
        .post(authRoutes.isAuthenticated, programRoutes.postProgram);

    // ENDPOINT: /programs/:id
    router.route('/programs/:id')
        .get(authRoutes.isAuthenticated, programRoutes.getProgramById)
        .put(authRoutes.isAuthenticated, programRoutes.putProgram)
        .patch(authRoutes.isAuthenticated, programRoutes.patchProgram)
        .delete(authRoutes.isAuthenticated, programRoutes.deleteProgram);
    /**
     * ====================================================================
     */


    /**
     *  Document:  ROLES.JS
     *  Define routes where they are stored endpoints
     */
        // ENDPOINT: /roles
    router.route('/roles')
       .get(authRoutes.isAuthenticated, roleRoutes.getRoles)
       .post(authRoutes.isAuthenticated, roleRoutes.postRol);

    // ENDPOINT: /roles/:id
    router.route('/roles/:id')
       .get(authRoutes.isAuthenticated, roleRoutes.getRolById)
       .put(authRoutes.isAuthenticated, roleRoutes.putRol)
       .patch(authRoutes.isAuthenticated, roleRoutes.patchRol)
       .delete(authRoutes.isAuthenticated, roleRoutes.deleteRol);
    /**
     * ====================================================================
     */


    /**
     *  Document:  STATES.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /states
    router.route('/states')
        .get(authRoutes.isAuthenticated, stateRoutes.getStates)
        .post(authRoutes.isAuthenticated, stateRoutes.postState);

    // ENDPOINT: /states/:id
    router.route('/states/:id')
        .get(authRoutes.isAuthenticated, stateRoutes.getStateById)
        .put(authRoutes.isAuthenticated, stateRoutes.putState)
        .patch(authRoutes.isAuthenticated, stateRoutes.patchState)
        .delete(authRoutes.isAuthenticated, stateRoutes.deleteState);
    /**
     * ====================================================================
     */


    /**
     *  Document:  USERS.JS
     *  Define routes where they are stored endpoints
     */
    // ENDPOINT: /users
    router.route('/users')
        .get(authRoutes.isAuthenticated, userRoutes.getUsers)
        .post(userRoutes.postUser);
        //.post(authRoutes.isAuthenticated, userRoutes.postUser);

    // ENDPOINT: /users/:id
    // ENDPOINT: /users/count
    // ENDPOINT: /users/count?initialDate=yyyy-mm-dd&endDate=yyyy-mm-dd
    router.route('/users/:id')
        .get(authRoutes.isAuthenticated, userRoutes.getUserById)
        .put(authRoutes.isAuthenticated, userRoutes.putUser)
        .patch(authRoutes.isAuthenticated, userRoutes.patchUser)
        .delete(authRoutes.isAuthenticated, userRoutes.deleteUser);

    // ENDPOINT: /login
    router.route('/login')
        .get(authRoutes.isLoginAuthenticated, userRoutes.getLogin);

    // ENDPOINT: /password/reset
    router.route('/password/reset')
        .post(authRoutes.isAuthenticated, userRoutes.postPasswordReset);

    // ENDPOINT: /password/reset/:code
    router.route('/password/reset/:code')
        .patch(authRoutes.isAuthenticated, userRoutes.PatchPasswordReset);

    /**
     * ====================================================================
     */
}

// Export the function that initialize all routes
module.exports.SetupRouter = SetupRouter;