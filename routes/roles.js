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

// ENDPOINT: /roles METHOD: POST
exports.postRol = function (req, res) {
    // Create a new instance of the Roles model
    var rol = new Roles();

    // Set the Roles properties that came from the POST data
    rol.name = req.body.name;
    rol.creationDate = Date.now();
    rol.lastEditionDate = Date.now();
    rol.enabled = true;

    rol.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Rol created successfully!', data: rol });
    });
};

// ENDPOINT: /roles/:id METHOD: PUT
exports.putRol = function(req, res){
    Roles.findById(req.params.id, function (err, rol) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the Roles properties that came from the PUT data
        rol.name = req.body.name;
        rol.creationDate = req.body.creationDate;
        rol.lastEditionDate = Date.now();
        rol.enabled = req.body.enabled;

        rol.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Rol updated successfully', data: rol });
        });
    });
};

// ENDPOINT: /roles/:id METHOD: PATCH
exports.patchRol = function(req, res){
    Roles.findById(req.params.id, function (err, rol) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        rol.enabled = req.body.enabled;
        rol.lastEditionDate = Date.now();

        rol.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(rol.enabled === true){
                message = 'Rol enabled successfully';
            }else{
                message = 'Rol disbled successfully';
            }
            // success
            res.json({message: message, data: rol });
        });
    });
};

// ENDPOINT: /roles/:id METHOD: DELETE
exports.deleteRol = function(req, res){
    Roles.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Rol deleted successfully!' });
    });
};