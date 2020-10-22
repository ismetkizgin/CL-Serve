const { routerAuthorization } = require('../utils');
const HttpStatusCode = require('http-status-codes');
const TransactionsFactory = require('../database/transactionFactory');
const authTransactions = TransactionsFactory.creating('authTransactions');

class Authorization {
    constructor() { }

    static async authControl(req, res, next) {
        try {
            const auth = routerAuthorization[req.route.path.split('/')[1].replace('-','_')][req.method].Authorize;
            if (!auth || auth.indexOf(req.decode.UserTypeName) != -1)
                next()
            else
                res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Unauthorized transaction." });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    static async userInsertAuthControl(req, res, next) {
        try {
            const result = await authTransactions.additiveUserTypesAsync(req.decode.UserTypeName);
            if (result.findIndex(
                (statusName) => statusName.UserTypeName == req.body.UserTypeName
            ) == -1)
                res.status(HttpStatusCode.UNAUTHORIZED).json('Unauthorized transaction! You cannot do any action on this user type.');
            else
                next();
        } catch (error) {
            res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }
}

module.exports = Authorization;