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
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.Developer],
            Individual_Authorize: [Roles.Developer]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.Developer],
            Individual_Authorize: [Roles.Developer]
        },
        GET: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.Developer],
            Individual_Authorize: [Roles.Developer]
        },
    },
    blog: {
        POST: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.Editor]
        },
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.Editor],
            Individual_Authorize: [Roles.Editor]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.Developer],
            Individual_Authorize: [Roles.Developer]
        },
        GET: {
            Authorize: [Roles.Root, Roles.Administrator, Roles.Developer],
            Individual_Authorize: [Roles.Developer]
        }
    }
}