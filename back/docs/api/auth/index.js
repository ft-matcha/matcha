"use strict";
const signup = require('./signup.js');
const login = require('./login.js');
module.exports = Object.assign(Object.assign({}, signup), login);
