const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization, languages } = require('../middleware');
const componentMenuTransactions = TransactionsFactory.creating('componentMenuTransactions');
const componentMenuValidator = validators.componentMenuValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const langueRouterControl = languages.langueRouterControl
const HttpStatusCode = require('http-status-codes');

router.get('/component-menu/:LangueID', tokenControl, authControl, langueRouterControl, componentMenuValidator.list, async (req, res) => {
    try {
        req.body.LangueID = req.params.LangueID;
        const result = await componentMenuTransactions.listAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;