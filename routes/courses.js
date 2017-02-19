/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var Course = require('../models/courses').Course;
var Level = require('../models/lessons').Lesson;
var Program = require('../models/programs').Program;

// ENDPOINT: /courses METHOD: GET
exports.getCourses = function(req, res){
    // Use the 'Courses' model to find all Courses
    Course.find(function (err, courses) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(courses);
    });
};

// ENDPOINT: /courses/:id METHOD: GET
exports.getCourseById = function(req, res){
    // Use the 'Courses' model to find single Courses
    Course.findById(req.params.id, function (err, course) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(course);
    });
};

// ENDPOINT: /courses METHOD: POST
exports.postCourse = function (req, res) {
    // Create a new instance of the Courses model
    var course = new Course();

    // Set the Courses properties that came from the POST data
    course.name = req.body.name;
    course.description = req.body.description;
    course.order = req.body.order;
    course.price = req.body.price;
    course.enabled = req.body.enabled;

    // embed program document
    for (var i = 0; i < req.body.program.length; ++i) {
        // Assign Item value from body properties
        var program = new Program();
        program._id = req.body.program[i]._id;
        program.name = req.body.program[i].name;
        course.program.push(program);
    }
    // embed level  document
    for (var i = 0; i < req.body.level.length; ++i) {
        // Assign Item value from body properties
        var level = new Level();
        level._id = req.body.level[i]._id;
        level.name = req.body.level[i].name;
        course.level.push(level);
    }

    course.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Course created successfully!', data: course });
    });
};

// ENDPOINT: /courses/:id METHOD: PUT
exports.putCourse = function(req, res){
    Course.findById(req.params.id, function (err, course) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Delete all the items of the questionnaire
        course.update({
            $set: {
                prgoram: [],
                level:[]
            }
        }, function(err, affected) {
            // Check for errors and show message
            if (err) {
                logger.error(err);
                res.send(err);
            }
            // Deleted all items
            logger.info('Delete program and level before insert modified values');
        });



        // Set the Courses properties that came from the PUT data
        course.name = req.body.name;
        course.description = req.body.description;
        course.order = req.body.order;
        course.price = req.body.price;
        course.enabled = req.body.enabled;
        // embed program document
        for (var i = 0; i < req.body.program.length; ++i) {
            // Assign Item value from body properties
            var program = new Program();
            program._id = req.body.program[i]._id;
            program.name = req.body.program[i].name;
            course.program.push(program);
        }
        // embed level  document
        for (var i = 0; i < req.body.level.length; ++i) {
            // Assign Item value from body properties
            var level = new Level();
            level._id = req.body.level[i]._id;
            level.name = req.body.level[i].name;
            course.level.push(level);
        }

        course.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Course updated successfully', data: course });
        });
    });
};

// ENDPOINT: /courses/:id METHOD: PATCH
exports.patchCourse = function(req, res){
    Course.findById(req.params.id, function (err, course) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        course.enabled = req.body.enabled;

        course.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(course.enabled === true){
                message = 'Course enabled successfully';
            }else{
                message = 'Course disbled successfully';
            }
            // success
            res.json({message: message, data: course });
        });
    });
};

// ENDPOINT: /courses/:id METHOD: DELETE
exports.deleteCourse = function(req, res){
    Course.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Course deleted successfully!' });
    });
};