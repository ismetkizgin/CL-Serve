const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const componentTransactions = TransactionsFactory.creating('componentTransactions');
const componentValidator = validators.componentValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');

router.post('/component', tokenControl, authControl, componentValidator.insert, async (req, res) => {
    try {
        const result = await componentTransactions.insertAsync(Object.assign(req.body, { UserID: req.decode.UserID }));
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;