const Roles = require('../models/roles');

module.exports = {
    user: {
        GET: {
            Authorize: [Roles.Root, Roles.Administrator]
        }
    }
}