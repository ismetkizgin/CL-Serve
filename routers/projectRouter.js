const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const projectTransactions = TransactionsFactory.creating('projectTransactions');
const projectValidator = validators.projectValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');
let { routerAuthorization } = require('../utils');
routerAuthorization = routerAuthorization['project'];

router.get('/project', tokenControl, projectValidator.list, async (req, res) => {
    try {
        if (routerAuthorization[req.method].Public_Authorize.indexOf(req.decode.UserTypeName) === -1)
            req.body.UserID = req.decode.UserID;
        const result = await projectTransactions.listAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.delete('/project', tokenControl, projectValidator.delete, async (req, res) => {
    try {
        const findResult = await projectTransactions.findAsync(req.body.ProjectID);
        if (routerAuthorization[req.method].Public_Authorize.indexOf(req.decode.UserTypeName) === -1 && req.decode.UserID != findResult.UserID) {
            res.status(HttpStatusCode.UNAUTHORIZED).send('Unauthorized transaction !');
            return;
        }

        const result = await projectTransactions.deleteAsync(req.body.ProjectID);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;