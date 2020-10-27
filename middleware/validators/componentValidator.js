const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class ComponentMenuValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                ComponentName: joi.string().required(),
                ComponentDescription: joi.string().required(),
                ComponentCode: joi.string().required(),
                ComponentState: joi.boolean(),
                MenuID: joi.number().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async update(req, res, next) {
        try {
            await joi.object({
                ComponentID: joi.number().min(0).required(),
                ComponentName: joi.string().required(),
                ComponentDescription: joi.string().required(),
                ComponentCode: joi.string().required(),
                ComponentState: joi.boolean(),
                MenuID: joi.number().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = ComponentMenuValidator;