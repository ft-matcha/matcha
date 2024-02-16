const create = require('./create.js');
const update = require('./update.js');
module.exports = {
    ...create,
    ...update,
};
