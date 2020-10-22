const HttpStatusCode = require('http-status-codes');
const TransactionsFactory = require('../database/transactionFactory');
const languagesTransactions = TransactionsFactory.creating('languagesTransactions');

class Authorization {
    constructor() { }

    static async langueRouterControl(req, res, next) {
        try {
            const result = await languagesTransactions.listAsync();
            if (!result.find(langue => langue.LangueID == req.body.LangueID)) {
                res.status(HttpStatusCode.BAD_REQUEST).send('Language option is not supported.');
                return;
            }
            next();
        } catch (error) {
            res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }
}

module.exports = Authorization;