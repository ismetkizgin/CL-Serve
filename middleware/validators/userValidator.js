const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class UserValidator {
    constructor() { }

    errorResponse = {
        status: HttpStatusCode.EXPECTATION_FAILED,
        message: 'Must have correct data entry.'
    }

    static async list(req, res, next) {
        try {
            await joi.object({
                limit: joi.number(),
                offset: joi.number()
            }).with('offset', 'limit').validateAsync(req.body);
            next();
        } catch (error) {
            res.status(errorResponse.status).json(errorResponse.message);
        }
    }
}

module.exports = UserValidator;