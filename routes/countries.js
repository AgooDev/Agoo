/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var Country = require('../models/countries').Country;

// ENDPOINT: /countries METHOD: GET
exports.getCountries = function(req, res){
    // Use the 'Countries' model to find all Countries
    Country.find(function (err, countries) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(countries);
    });
};

// ENDPOINT: /countries/:id METHOD: GET
exports.getCountryById = function(req, res){
    // Use the 'Countries' model to find single Countries
    Country.findById(req.params.id, function (err, country) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(country);
    });
};

// ENDPOINT: /countries METHOD: POST
exports.postCountry = function (req, res) {
    // Create a new instance of the Countries model
    var country = new Country();

    // Set the Countries properties that came from the POST data
    country.name = req.body.name;
    country.sortname = req.body.sortname;

    country.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Country created successfully!', data: country });
    });
};

// ENDPOINT: /countries/:id METHOD: PUT
exports.putCountry = function(req, res){
    Country.findById(req.params.id, function (err, country) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the Countries properties that came from the PUT data
        country.name = req.body.name;
        country.sortname = req.body.sortname;
        country.enabled = req.body.enabled;

        country.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Country updated successfully', data: country });
        });
    });
};

// ENDPOINT: /countries/:id METHOD: PATCH
exports.patchCountry = function(req, res){
    Country.findById(req.params.id, function (err, country) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        country.enabled = req.body.enabled;

        country.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(country.enabled === true){
                message = 'Country enabled successfully';
            }else{
                message = 'Country disbled successfully';
            }
            // success
            res.json({message: message, data: country });
        });
    });
};

// ENDPOINT: /countries/:id METHOD: DELETE
exports.deleteCountry = function(req, res){
    Country.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Country deleted successfully!' });
    });
};