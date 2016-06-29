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

// ENDPOINT: /permissions METHOD: POST
exports.postPermission = function (req, res) {
    // Create a new instance of the Permission model
    var permi = new Permission();

    // Set the Permission properties that came from the POST data
    permi.name = req.body.name;
    permi.module = req.body.module;
    permi.creationDate = Date.now();
    permi.lastEditionDate = Date.now();
    permi.enabled = true;

    permi.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Permission created successfully!', data: permi });
    });
};

// ENDPOINT: /permissions/:id METHOD: PUT
exports.putPermission = function(req, res){
    Permission.findById(req.params.id, function (err, permi) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the Permission properties that came from the PUT data
        permi.name = req.body.name;
        permi.module = req.body.module;
        permi.creationDate = req.body.creationDate;
        permi.lastEditionDate = Date.now();
        permi.enabled = req.body.enabled;

        permi.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Permission updated successfully', data: permi });
        });
    });
};
// ENDPOINT: /permissions/:id METHOD: DELETE
exports.deletePermission = function(req, res){
    Permission.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Permission deleted successfully!' });
    });
};