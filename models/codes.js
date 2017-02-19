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
// TODO: encriptar value que es el codigo de autorizacion

/**
 * Define 'Code' schema.
 */
var CodeSchema   = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    redirectUri: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    idClient: {
        type: String,
        required: true
    }
},{
    timestamps  : true
});

/**
 * Expose 'Code' model.
 */
module.exports.Code = mongoose.model('Code', CodeSchema);