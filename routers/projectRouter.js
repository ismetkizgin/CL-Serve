const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const projectTransactions = TransactionsFactory.creating('projectTransactions');
const projectValidator = validators.projectValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');
let { routerAuthorization } = require('../utils');
routerAuthorization = routerAuthorization['component'];

router.get('/project', tokenControl, authControl, projectValidator.list, async (req, res) => {
    try {
        const result = await projectTransactions.listAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;