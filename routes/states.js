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
var Country = require('../models/countries').Country;

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
    State.findById(req.params.id, function (err, state) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(state);
    });
};

// ENDPOINT: /states METHOD: POST
exports.postState = function (req, res) {
    // Create a new instance of the States model
    var state = new State();

    // Set the States properties that came from the POST data
    state.name = req.body.name;

    // embed country document
    for (var i = 0; i < req.body.country.length; ++i) {
        // Assign Item value from body properties
        var country = new Country();
        country._id = req.body.country[i]._id;
        country.name = req.body.country[i].name;
        state.county.push(country);
    }

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
    State.findById(req.params.id, function (err, state) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Delete all the items of the questionnaire
        state.update({
            $set: {
                country: []
            }
        }, function(err, affected) {
            // Check for errors and show message
            if (err) {
                logger.error(err);
                res.send(err);
            }
            // Deleted all items
            logger.info('Delete country before insert modified values');
        });

        // Set the States properties that came from the PUT data
        state.name = req.body.name;
        // embed country document
        for (var i = 0; i < req.body.country.length; ++i) {
            // Assign Item value from body properties
            var country = new Country();
            country._id = req.body.country[i]._id;
            country.name = req.body.country[i].name;
            state.county.push(country);
        }
        state.enabled = req.body.enabled;

        state.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'State updated successfully', data: state });
        });
    });
};

// ENDPOINT: /states/:id METHOD: PATCH
exports.patchState = function(req, res){
    State.findById(req.params.id, function (err, state) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        state.enabled = req.body.enabled;

        state.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(state.enabled === true){
                message = 'State enabled successfully';
            }else{
                message = 'State disbled successfully';
            }
            // success
            res.json({message: message, data: state });
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