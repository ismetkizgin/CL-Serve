const Roles = require('../models/roles');

module.exports = {
    user: {
        GET: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        POST: {
            Authorize: [Roles.Root, Roles.Administrator]
        }
    },
    component_menu: {
        GET: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        POST: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator]
        }
    },
    blog_menu: {
        GET: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        POST: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator]
        }
    },
    component: {
        POST: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.Developer]
        },
    }
}