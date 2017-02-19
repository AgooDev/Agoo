/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Define 'Lesson' schema.
 */
var LessonSchema = new Schema({
    name: String,
    enabled: Boolean
},{
    timestamps  : true
});

/**
 * Expose 'Lesson' model.
 */
module.exports.Lesson = mongoose.model('Lesson', LessonSchema);