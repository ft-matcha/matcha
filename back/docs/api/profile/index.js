"use strict";
const create = require('./create.js');
const update = require('./update.js');
module.exports = Object.assign(Object.assign({}, create), update);
