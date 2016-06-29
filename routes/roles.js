/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var Roles = require('../models/roles').Roles;

// ENDPOINT: /roles METHOD: GET
exports.getRoles = function(req, res){
    // Use the 'Roles' model to find all Roles
    Roles.find(function (err, roles) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(roles);
    });
};

// ENDPOINT: /roles/:id METHOD: GET
exports.getRolById = function(req, res){
    // Use the 'Roles' model to find single Roles
    Roles.findById(req.params.id, function (err, rol) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(rol);
    });
};
};