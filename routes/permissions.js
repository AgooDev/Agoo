/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */
// Load required packages
var logger = require('../config/logger').logger;
var Permission = require('../models/permissions').Permission;

// ENDPOINT: /permissions METHOD: GET
exports.getPermissions = function(req, res){
    // Use the 'Permission' model to find all Permissions
    Permission.find(function (err, permis) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(permis);
    });
};

// ENDPOINT: /permissions/:id METHOD: GET
exports.getPermissionById = function(req, res){
    // Use the 'Permission' model to find single Permission
    Permission.findById(req.params.id, function (err, permi) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(permi);
    });
};