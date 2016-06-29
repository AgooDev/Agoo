/**
 * Copyright (c) 2016-present, Agoo.com.co <http://www.agoo.com.co>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

// Load required packages
var Logger = require('../config/logger');
var logger = Logger.logger;
var DataModel = require('../models/clients');
var Client = DataModel.Client;
// TODO: implementar mas verbos y funciones para administrar los clientes
// ENDPOINT: /clients METHOD: GET
exports.getClientByIdClient = function(req, res){
    // Use the 'Client' model to find the client by his id [idUser]
    Client.find({ idUser : req.user._id },function(err, client){
        // Check for errors and show message
        if(err){
            logger.error(err);
            res.send(err);
        }
        // success
        res.json(client);
    });
};