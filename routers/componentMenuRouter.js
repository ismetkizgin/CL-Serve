const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const componentMenuTransactions = TransactionsFactory.creating('componentMenuTransactions');
const componentMenuValidator = validators.componentMenuValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');

router.get('/component-menu/', componentMenuValidator.list, async (req, res) => {
    try {
        const result = await componentMenuTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.get('/component-menu/:ComponentMenuID', tokenControl, authControl, componentMenuValidator.find, async (req, res) => {
    try {
        const result = await componentMenuTransactions.findAsync(req.params.ComponentMenuID);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.post('/component-menu', tokenControl, authControl, componentMenuValidator.insert, async (req, res) => {
    try {
        const result = await componentMenuTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.put('/component-menu', tokenControl, authControl, componentMenuValidator.update, async (req, res) => {
    try {
        const result = await componentMenuTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.delete('/component-menu', tokenControl, authControl, componentMenuValidator.delete, async (req, res) => {
    try {
        const result = await componentMenuTransactions.deleteAsync(req.body.ComponentMenuID);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;