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
 * Define 'Country' schema.
 */
var CountrySchema = new Schema({
    name: String,
    sortname: String,
    enabled: {
        type: Boolean,
        default: true
    }
},{
    timestamps  : true
});

/**
 * Expose 'Country' model.
 */
module.exports.Country = mongoose.model('Country', CountrySchema);