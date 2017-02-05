/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var logger = require('../config/logger').logger;
var Content = require('../models/content').Content;
var Course = require('../models/courses').Course;
var Type = require('../models/contentTypes').ContentType;
var ItemImage = require('../models/contentItems').ItemImageAnswer;
var ItemText = require('../models/contentItems').ItemTextAnswer;
var ItemVideo = require('../models/contentItems').ItemVideoAnswer;

// ENDPOINT: /content METHOD: GET
exports.getContent = function(req, res){
    // Use the 'Content' model to find all Content
    Content.find(function (err, content) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(content);
    });
};

// ENDPOINT: /content/:id METHOD: GET
exports.getContentById = function(req, res){
    // Use the 'Content' model to find single Content
    Content.findById(req.params.id, function (err, content) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(content);
    });
};

// ENDPOINT: /content METHOD: POST
exports.postContent = function (req, res) {
    // Create a new instance of the Content model
    var content = new Content();

    // Set the Content properties that came from the POST data
    content.name = req.body.name;
    content.description = req.body.description;
    content.enabled = req.body.enabled;

    // embed course  document
    for (var i = 0; i < req.body.course.length; ++i) {
        // Assign Item value from body properties
        var course = new Course();
        course._id = req.body.course[i]._id;
        course.name = req.body.course[i].name;
        course.course.push(course);
    }

    // embed content types  document
    for (var i = 0; i < req.body.type.length; ++i) {
        // Assign Item value from body properties
        var type = new Type();
        type._id = req.body.type[i]._id;
        type.name = req.body.type[i].name;
        type.type.push(type);
    }

    // embed ItemVideos  document
    for (var i = 0; i < req.body.video.length; ++i) {
        // Assign Item value from body properties
        var itemVideo = new ItemVideo();
        itemVideo._id = req.body.video[i]._id;
        itemVideo.title = req.body.video[i].title;
        item.video.push(item);
    }

    // embed ItemImage  document
    for (var i = 0; i < req.body.image.length; ++i) {
        // Assign Item value from body properties
        var itemImage = new ItemImage();
        itemImage._id = req.body.image[i]._id;
        itemImage.name = req.body.image[i].name;
        item.image.push(item);
    }

    // embed ItemImage  document
    for (var i = 0; i < req.body.text.length; ++i) {
        // Assign Item value from body properties
        var itemText = new ItemText();
        itemText._id = req.body.text[i]._id;
        itemText.name = req.body.text[i].name;
        item.text.push(item);
    }

    content.save(function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Content created successfully!', data: content });
    });
};

// ENDPOINT: /content/:id METHOD: PUT
exports.putContent = function(req, res){
    Content.findById(req.params.id, function (err, content) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        // Set the Content properties that came from the PUT data
        content.name = req.body.name;
        content.description = req.body.description;
        content.enabled = req.body.enabled;

        content.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            // success
            res.json({message: 'Content updated successfully', data: content });
        });
    });
};

// ENDPOINT: /content/:id METHOD: PATCH
exports.patchContent = function(req, res){
    Content.findById(req.params.id, function (err, content) {
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }

        content.enabled = req.body.enabled;

        content.save(function(err){
            // Check for errors and show message
            if(err){
                logger.error(err);
                res.send(err);
            }
            var message = '';
            if(content.enabled === true){
                message = 'Content enabled successfully';
            }else{
                message = 'Content disbled successfully';
            }
            // success
            res.json({message: message, data: content });
        });
    });
};

// ENDPOINT: /content/:id METHOD: DELETE
exports.deleteContent = function(req, res){
    Content.findByIdAndRemove(req.params.id, function(err){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json({ message: 'Content deleted successfully!' });
    });
};