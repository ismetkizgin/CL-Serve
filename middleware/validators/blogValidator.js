const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class BlogValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                BlogTitle: joi.string().required(),
                BlogDescription: joi.string().required(),
                BlogContent: joi.string().required(),
                BlogState: joi.boolean(),
                BlogMenuID: joi.number().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async update(req, res, next) {
        try {
            await joi.object({
                BlogID: joi.number().min(1).required(),
                BlogTitle: joi.string().required(),
                BlogDescription: joi.string().required(),
                BlogContent: joi.string().required(),
                BlogState: joi.boolean(),
                BlogMenuID: joi.number().required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async delete(req, res, next) {
        try {
            await joi.object({
                BlogID: joi.number().min(1).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = BlogValidator;