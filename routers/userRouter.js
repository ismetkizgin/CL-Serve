const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const userTransactions = TransactionsFactory.creating('userTransactions');
const userValidator = validators.userValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');

router.get('/user', tokenControl, authControl, userValidator.list, async (req, res) => {
    try {
        const result = await userTransactions.listAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.get('/user/:UserID', tokenControl, authControl, userValidator.find, async (req, res) => {
    try {
        const result = await userTransactions.findAsync({ UserID: req.params.UserID, UserTypeName: req.decode.UserTypeName });
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.delete('/user', tokenControl, authControl, userValidator.delete, async (req, res) => {
    try {
        await userTransactions.findAsync({ UserID: req.body.UserID, UserTypeName: req.decode.UserTypeName });
        const result = await userTransactions.deleteAsync(req.body.UserID);
        res.json(result);
    } catch (error) {
        console.log(error)
        if (error.status == 404)
            res.status(HttpStatusCode.UNAUTHORIZED).send('User is not registered in the system or unauthorized operation.');
        else
            res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;