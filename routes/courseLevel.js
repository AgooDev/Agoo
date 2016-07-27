/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var Level = require('../models/courseLevels').CourseLevel;

// ENDPOINT: /course/levels METHOD: GET
exports.getCourseLevels = function(req, res){
    // Use the 'Course Levels' model to find all Course Levels
    Level.find(function (err, levels) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(levels);
    });
};

// ENDPOINT: /course/levels/:id METHOD: GET
exports.getCourseLevelById = function(req, res){
    // Use the 'Course Levels' model to find single Course Levels
    Level.findById(req.params.id, function (err, level) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(level);
    });
};

// ENDPOINT: /course/levels METHOD: POST
exports.postCourseLevel = function (req, res) {
    // Create a new instance of the Course Levels model
    var level = new Level();

    // Set the Course Levels properties that came from the POST data
    level.name = req.body.name;
    level.enabled = req.body.enabled;

    level.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Course Level created successfully!', data: level });
    });
};

// ENDPOINT: /course/levels/:id METHOD: PUT
exports.putCourseLevel = function(req, res){
    Level.findById(req.params.id, function (err, level) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the Course Levels properties that came from the PUT data
        level.name = req.body.name;
        level.enabled = req.body.enabled;

        level.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Course Level updated successfully', data: level });
        });
    });
};

// ENDPOINT: /course/levels/:id METHOD: PATCH
exports.patchCourseLevel = function(req, res){
    Level.findById(req.params.id, function (err, level) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        level.enabled = req.body.enabled;

        level.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(level.enabled === true){
                message = 'Course Level enabled successfully';
            }else{
                message = 'Course Level disbled successfully';
            }
            // success
            res.json({message: message, data: level });
        });
    });
};

// ENDPOINT: /course/levels/:id METHOD: DELETE
exports.deleteCourseLevel = function(req, res){
    Level.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Course Level deleted successfully!' });
    });
};