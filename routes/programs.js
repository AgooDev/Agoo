/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var Program = require('../models/programs').Program;

// ENDPOINT: /programs METHOD: GET
exports.getPrograms = function(req, res){
    // Use the 'Programs' model to find all Programs
    Program.find(function (err, programs) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(programs);
    });
};

// ENDPOINT: /programs/:id METHOD: GET
exports.getProgramById = function(req, res){
    // Use the 'Programs' model to find single Programs
    Program.findById(req.params.id, function (err, program) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(program);
    });
};

// ENDPOINT: /programs METHOD: POST
exports.postProgram = function (req, res) {
    // Create a new instance of the Programs model
    var program = new Program();

    // Set the Programs properties that came from the POST data
    program.name = req.body.name;
    program.description = req.body.description;
    program.enabled = req.body.enabled;

    program.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Program created successfully!', data: program });
    });
};

// ENDPOINT: /programs/:id METHOD: PUT
exports.putProgram = function(req, res){
    Program.findById(req.params.id, function (err, program) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the Programs properties that came from the PUT data
        program.name = req.body.name;
        program.description = req.body.description;
        program.enabled = req.body.enabled;

        program.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Program updated successfully', data: program });
        });
    });
};

// ENDPOINT: /programs/:id METHOD: PATCH
exports.patchProgram = function(req, res){
    Program.findById(req.params.id, function (err, program) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        program.enabled = req.body.enabled;

        program.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(program.enabled === true){
                message = 'Program enabled successfully';
            }else{
                message = 'Program disbled successfully';
            }
            // success
            res.json({message: message, data: program });
        });
    });
};

// ENDPOINT: /programs/:id METHOD: DELETE
exports.deleteProgram = function(req, res){
    Program.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Program deleted successfully!' });
    });
};