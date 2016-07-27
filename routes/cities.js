/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var City = require('../models/cities').City;
var State = require('../models/states').State;

// ENDPOINT: /cities METHOD: GET
exports.getCities = function(req, res){
    // Use the 'Cities' model to find all Cities
    City.find(function (err, cities) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(cities);
    });
};

// ENDPOINT: /cities/:id METHOD: GET
exports.getCityById = function(req, res){
    // Use the 'Cities' model to find single Cities
    City.findById(req.params.id, function (err, city) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(city);
    });
};

// ENDPOINT: /cities METHOD: POST
exports.postCity = function (req, res) {
    // Create a new instance of the Cities model
    var city = new City();

    // Set the Cities properties that came from the POST data
    city.name = req.body.name;

    // embed state document
    for (var i = 0; i < req.body.state.length; ++i) {
        // Assign Item value from body properties
        var state = new State();
        state._id = req.body.state[i]._id;
        state.name = req.body.state[i].name;
        city.county.push(state);
    }

    city.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'City created successfully!', data: city });
    });
};

// ENDPOINT: /cities/:id METHOD: PUT
exports.putCity = function(req, res){
    City.findById(req.params.id, function (err, city) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Delete all the items of the questionnaire
        city.update({
            $set: {
                state: []
            }
        }, function(err, affected) {
            // Check for errors and show message
            if (err) {
                logger.error(err);
                res.send(err);
            }
            // Deleted all items
            logger.info('Delete coutnry before insert modified values');
        });

        // Set the Cities properties that came from the PUT data
        city.name = req.body.name;
        // embed state document
        for (var i = 0; i < req.body.state.length; ++i) {
            // Assign Item value from body properties
            var state = new State();
            state._id = req.body.state[i]._id;
            state.name = req.body.state[i].name;
            city.county.push(state);
        }
        city.enabled = req.body.enabled;

        city.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'City updated successfully', data: city });
        });
    });
};

// ENDPOINT: /cities/:id METHOD: PATCH
exports.patchCity = function(req, res){
    City.findById(req.params.id, function (err, city) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        city.enabled = req.body.enabled;

        city.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(city.enabled === true){
                message = 'City enabled successfully';
            }else{
                message = 'City disbled successfully';
            }
            // success
            res.json({message: message, data: city });
        });
    });
};

// ENDPOINT: /cities/:id METHOD: DELETE
exports.deleteCity = function(req, res){
    City.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'City deleted successfully!' });
    });
};