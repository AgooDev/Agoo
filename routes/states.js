/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var State = require('../models/states').State;

// ENDPOINT: /states METHOD: GET
exports.getStates = function(req, res){
    // Use the 'States' model to find all States
    State.find(function (err, states) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(states);
    });
};

// ENDPOINT: /states/:id METHOD: GET
exports.getStateById = function(req, res){
    // Use the 'States' model to find single States
    State.findById(req.params.id, function (err, rol) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(rol);
    });
};

// ENDPOINT: /states METHOD: POST
exports.postState = function (req, res) {
    // Create a new instance of the States model
    var state = new State();

    // Set the States properties that came from the POST data
    state.name = req.body.name;
    // TODO: add country reference
    state.enabled = true;

    state.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'State created successfully!', data: state });
    });
};

// ENDPOINT: /states/:id METHOD: PUT
exports.putState = function(req, res){
    State.findById(req.params.id, function (err, rol) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the States properties that came from the PUT data
        rol.name = req.body.name;
        // TODO: add country reference
        rol.enabled = req.body.enabled;

        rol.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'State updated successfully', data: rol });
        });
    });
};

// ENDPOINT: /states/:id METHOD: PATCH
exports.patchState = function(req, res){
    State.findById(req.params.id, function (err, rol) {
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
                message = 'State enabled successfully';
            }else{
                message = 'State disbled successfully';
            }
            // success
            res.json({message: message, data: rol });
        });
    });
};

// ENDPOINT: /states/:id METHOD: DELETE
exports.deleteState = function(req, res){
    State.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'State deleted successfully!' });
    });
};