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
// Define our Currency schema
var CurrencySchema = new Schema({
    name: String,
    enabled: {
        type: Boolean,
        default: true
    }
},{
    timestamps  : true
});

// Export the Mongoose model
module.exports.Currency = mongoose.model('Currency', CurrencySchema);