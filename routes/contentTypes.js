/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var Type = require('../models/contentTypes').ContentType;

// ENDPOINT: /content/types METHOD: GET
exports.getContentTypes = function(req, res){
    // Use the 'ContentTypes' model to find all ContentTypes
    Type.find(function (err, types) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(types);
    });
};

// ENDPOINT: /content/types/:id METHOD: GET
exports.getContentTypeById = function(req, res){
    // Use the 'ContentTypes' model to find single ContentTypes
    Type.findById(req.params.id, function (err, type) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(type);
    });
};

// ENDPOINT: /content/types METHOD: POST
exports.postContentType = function (req, res) {
    // Create a new instance of the ContentTypes model
    var type = new Type();

    // Set the ContentTypes properties that came from the POST data
    type.name = req.body.name;
    type.enabled = req.body.enabled;

    type.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Content Type created successfully!', data: type });
    });
};

// ENDPOINT: /content/types/:id METHOD: PUT
exports.putContentType = function(req, res){
    Type.findById(req.params.id, function (err, type) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the ContentTypes properties that came from the PUT data
        type.name = req.body.name;
        type.enabled = req.body.enabled;

        type.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Content Type updated successfully', data: type });
        });
    });
};

// ENDPOINT: /content/types/:id METHOD: PATCH
exports.patchContentType = function(req, res){
    Type.findById(req.params.id, function (err, type) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        type.enabled = req.body.enabled;

        type.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(type.enabled === true){
                message = 'Content Type enabled successfully';
            }else{
                message = 'Content Type disbled successfully';
            }
            // success
            res.json({message: message, data: type });
        });
    });
};

// ENDPOINT: /content/types/:id METHOD: DELETE
exports.deleteContentType = function(req, res){
    Type.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Content Type deleted successfully!' });
    });
};