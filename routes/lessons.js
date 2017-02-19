/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var Lesson = require('../models/lessons').Lesson;

// ENDPOINT: /lessons/courses METHOD: GET
exports.getCourseLessons = function(req, res){
    // Use the 'Course Lessons' model to find all Course Lessons
    Lesson.find(function (err, lessons) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(lessons);
    });
};

// ENDPOINT: /lessons/courses/:id METHOD: GET
exports.getCourseLessonById = function(req, res){
    // Use the 'Course Lessons' model to find single Course Lessons
    Lesson.findById(req.params.id, function (err, lesson) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(lesson);
    });
};

// ENDPOINT: /lessons/courses METHOD: POST
exports.postCourseLesson = function (req, res) {
    // Create a new instance of the Course Lessons model
    var lesson = new Lesson();

    // Set the Course Lessons properties that came from the POST data
    lesson.name = req.body.name;
    lesson.enabled = req.body.enabled;

    lesson.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Course Lesson created successfully!', data: lesson });
    });
};

// ENDPOINT: /lessons/courses/:id METHOD: PUT
exports.putCourseLesson = function(req, res){
    Lesson.findById(req.params.id, function (err, lesson) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the Course Lessons properties that came from the PUT data
        lesson.name = req.body.name;
        lesson.enabled = req.body.enabled;

        lesson.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Course Lesson updated successfully', data: lesson });
        });
    });
};

// ENDPOINT: /lessons/courses/:id METHOD: PATCH
exports.patchCourseLesson = function(req, res){
    Lesson.findById(req.params.id, function (err, lesson) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        lesson.enabled = req.body.enabled;

        lesson.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(lesson.enabled === true){
                message = 'Course Lesson enabled successfully';
            }else{
                message = 'Course Lesson disbled successfully';
            }
            // success
            res.json({message: message, data: lesson });
        });
    });
};

// ENDPOINT: /lessons/courses/:id METHOD: DELETE
exports.deleteCourseLesson = function(req, res){
    Lesson.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Course Lesson deleted successfully!' });
    });
};