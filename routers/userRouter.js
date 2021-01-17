const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const userTransactions = TransactionsFactory.creating("userTransactions");
const userValidator = validators.userValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const userInsertAuthControl = authorization.userInsertAuthControl;
const HttpStatusCode = require("http-status-codes");
const moment = require("moment");
let { routerAuthorization } = require("../utils");
routerAuthorization = routerAuthorization["user"];

router.get(
  "/user",
  tokenControl,
  authControl,
  userValidator.list,
  async (req, res) => {
    try {
      const result = await userTransactions.listAsync(req.query);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get(
  "/user/:UserID",
  tokenControl,
  userValidator.find,
  async (req, res) => {
    try {
      if (
        routerAuthorization[req.method].Individual_Authorize.indexOf(
          req.decode.UserTypeName
        ) !== -1
      )
        req.params.UserID = req.decode.UserID;
      const result = await userTransactions.findAsync({
        UserID: req.params.UserID,
        UserTypeName: req.decode.UserTypeName,
      });
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete(
  "/user",
  tokenControl,
  authControl,
  userValidator.delete,
  async (req, res) => {
    try {
      await userTransactions.statusFindAsync({
        UserID: req.body.UserID,
        UserTypeName: req.decode.UserTypeName,
      });
      const result = await userTransactions.deleteAsync(req.body.UserID);
      res.json(result);
    } catch (error) {
      if (error.status == 404)
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .send(
            "User is not registered in the system or unauthorized operation."
          );
      else
        res
          .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(error.message);
    }
  }
);

router.put(
  "/user",
  tokenControl,
  authControl,
  userValidator.update,
  userInsertAuthControl,
  async (req, res) => {
    try {
      await userTransactions.statusFindAsync({
        UserID: req.body.UserID,
        UserTypeName: req.decode.UserTypeName,
      });
      req.body.UserDateOfBirth = moment(
        new Date(req.body.UserDateOfBirth)
      ).format("YYYY/MM/DD");
      const result = await userTransactions.updateAsync(req.body);
      res.json(result);
    } catch (error) {
      if (error.status == 404)
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .send(
            "User is not registered in the system or unauthorized operation."
          );
      else
        res
          .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(error.message);
    }
  }
);

router.post(
  "/user",
  tokenControl,
  authControl,
  userValidator.insert,
  userInsertAuthControl,
  async (req, res) => {
    try {
      req.body.UserDateOfBirth = moment(
        new Date(req.body.UserDateOfBirth)
      ).format("YYYY/MM/DD");
      const result = await userTransactions.insertAsync(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
