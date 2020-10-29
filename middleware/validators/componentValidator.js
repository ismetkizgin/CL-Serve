const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class ComponentValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                ComponentName: joi.string().required(),
                ComponentDescription: joi.string().required(),
                ComponentCode: joi.string().required(),
                ComponentState: joi.boolean(),
                ComponentMenuID: joi.number().required()
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
                ComponentMenuID: joi.number().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async delete(req, res, next) {
        try {
            await joi.object({
                ComponentID: joi.number().min(1).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async find(req, res, next) {
        try {
            await joi.object({
                ComponentID: joi.number().min(1).required(),
            }).validateAsync({ ComponentID: parseInt(req.params.ComponentID) });
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async list(req, res, next) {
        try {
            await joi.object({
                limit: joi.number(),
                offset: joi.number(),
                ComponentState: joi.boolean()
            }).with('offset', 'limit').validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = ComponentValidator;