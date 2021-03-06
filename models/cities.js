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
var State = require('./states').State;

/**
 * Define 'City' schema.
 */
var CitySchema = new Schema({
    name: String,
    state: [State.schema],
    enabled: {
        type: Boolean,
        default: true
    }
},{
    timestamps  : true
});

/**
 * Expose 'City' model.
 */
module.exports.City = mongoose.model('City', CitySchema);