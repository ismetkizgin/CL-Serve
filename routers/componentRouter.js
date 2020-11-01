const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const componentTransactions = TransactionsFactory.creating('componentTransactions');
const componentValidator = validators.componentValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');
let { routerAuthorization } = require('../utils');
routerAuthorization = routerAuthorization['component'];

router.post('/component', tokenControl, authControl, componentValidator.insert, async (req, res) => {
    try {
        const result = await componentTransactions.insertAsync(Object.assign(req.body, { UserID: req.decode.UserID }));
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.put('/component', tokenControl, authControl, componentValidator.update, async (req, res) => {
    try {
        if (routerAuthorization[req.method].Individual_Authorize.indexOf(req.decode.UserTypeName) != -1) {
            const findComponent = await componentTransactions.findAsync(req.body.ComponentID);
            if (findComponent.UserID != req.decode.UserID) {
                res.status(HttpStatusCode.UNAUTHORIZED).send('Unauthorized transaction !')
                return;
            }
        }
        const result = await componentTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.delete('/component', tokenControl, authControl, componentValidator.delete, async (req, res) => {
    try {
        if (routerAuthorization[req.method].Individual_Authorize.indexOf(req.decode.UserTypeName) != -1) {
            const findComponent = await componentTransactions.findAsync(req.body.ComponentID);
            if (findComponent.UserID != req.decode.UserID) {
                res.status(HttpStatusCode.UNAUTHORIZED).send('Unauthorized transaction !')
                return;
            }
        }
        const result = await componentTransactions.deleteAsync(req.body.ComponentID);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.get('/component/:ComponentID', tokenControl, authControl, componentValidator.find, async (req, res) => {
    try {
        const result = await componentTransactions.findAsync(req.params.ComponentID);
        if (routerAuthorization[req.method].Individual_Authorize.indexOf(req.decode.UserTypeName) != -1) {
            if (result.UserID != req.decode.UserID) {
                res.status(HttpStatusCode.UNAUTHORIZED).send('Unauthorized transaction !')
                return;
            }
        }
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.get('/component', componentValidator.list, async (req, res) => {
    try {
        const result = await componentTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;