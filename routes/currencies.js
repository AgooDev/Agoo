/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var Currency = require('../models/currencies').Currency;

// ENDPOINT: /currencies METHOD: GET
exports.getCurrencies = function(req, res){
    // Use the 'Currencies' model to find all Currencies
    Currency.find(function (err, currencies) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(currencies);
    });
};

// ENDPOINT: /currencies/:id METHOD: GET
exports.getCurrencyById = function(req, res){
    // Use the 'Currencies' model to find single Currencies
    Currency.findById(req.params.id, function (err, currency) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(currency);
    });
};

// ENDPOINT: /currencies METHOD: POST
exports.postCurrency = function (req, res) {
    // Create a new instance of the Currencies model
    var currency = new Currency();

    // Set the Currencies properties that came from the POST data
    currency.name = req.body.name;

    currency.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Currency created successfully!', data: currency });
    });
};

// ENDPOINT: /currencies/:id METHOD: PUT
exports.putCurrency = function(req, res){
    Currency.findById(req.params.id, function (err, currency) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the Currencies properties that came from the PUT data
        currency.name = req.body.name;
        currency.enabled = req.body.enabled;

        currency.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Currency updated successfully', data: currency });
        });
    });
};

// ENDPOINT: /currencies/:id METHOD: PATCH
exports.patchCurrency = function(req, res){
    Currency.findById(req.params.id, function (err, currency) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        currency.enabled = req.body.enabled;

        currency.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(currency.enabled === true){
                message = 'Currency enabled successfully';
            }else{
                message = 'Currency disbled successfully';
            }
            // success
            res.json({message: message, data: currency });
        });
    });
};

// ENDPOINT: /currencies/:id METHOD: DELETE
exports.deleteCurrency = function(req, res){
    Currency.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Currency deleted successfully!' });
    });
};