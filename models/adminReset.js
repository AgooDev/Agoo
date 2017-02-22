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
var User = require('./users').User;

/**
 * Define 'AdminReset' schema.
 */
var AdminResetSchema = new Schema({
    name: String,
    user: [User.schema],
    email: String,
    code: String
},{
    timestamps  : true
});

/**
 * Expose 'AdminReset' model.
 */
module.exports.AdminReset = mongoose.model('AdminReset', AdminResetSchema);