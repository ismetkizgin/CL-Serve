const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class ComponentMenuValidator {
    constructor() { }

    static async list(req, res, next) {
        try {
            await joi.object({
                limit: joi.number(),
                offset: joi.number()
            }).with('offset', 'limit').validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async find(req, res, next) {
        try {
            await joi.object({
                ComponentMenuID: joi.number().min(1).required(),
            }).validateAsync({ ComponentMenuID: parseInt(req.params.ComponentMenuID) });
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = ComponentMenuValidator;