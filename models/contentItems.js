/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Define our Item Video Answer schema
var ItemVideoAnswerSchema = new Schema({
    title: String,
    video: String,
    answer: String
},{
    timestamps  : true
});


// Define our Item Image Answer schema
var ItemImageAnswerSchema = new Schema({
    title: String,
    image: String,
    tianswertle: String
},{
    timestamps  : true
});


// Define our Item Text Answer schema
var ItemTextAnswerSchema = new Schema({
    title: String,
    text: String,
    answer: String
},{
    timestamps  : true
});


// Export the Mongoose model
module.exports.ItemVideoAnswer = mongoose.model('ItemVideoAnswer', ItemVideoAnswerSchema);
module.exports.ItemImageAnswer = mongoose.model('ItemImageAnswer', ItemImageAnswerSchema);
module.exports.ItemTextAnswer = mongoose.model('ItemTextAnswer', ItemTextAnswerSchema);