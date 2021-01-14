const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const blogTransactions = TransactionsFactory.creating("blogTransactions");
const blogValidator = validators.blogValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require("http-status-codes");
let { routerAuthorization } = require("../utils");
routerAuthorization = routerAuthorization["blog"];

router.post(
  "/blog",
  tokenControl,
  authControl,
  blogValidator.insert,
  async (req, res) => {
    try {
      const result = await blogTransactions.insertAsync(
        Object.assign(req.body, { UserID: req.decode.UserID })
      );
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  "/blog",
  tokenControl,
  authControl,
  blogValidator.update,
  async (req, res) => {
    try {
      if (
        routerAuthorization[req.method].Individual_Authorize.indexOf(
          req.decode.UserTypeName
        ) != -1
      ) {
        const findBlog = await blogTransactions.findAsync(req.body.BlogID);
        if (findBlog.UserID != req.decode.UserID) {
          res
            .status(HttpStatusCode.UNAUTHORIZED)
            .send("Unauthorized transaction !");
          return;
        }
      }
      const result = await blogTransactions.updateAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete(
  "/blog",
  tokenControl,
  authControl,
  blogValidator.delete,
  async (req, res) => {
    try {
      if (
        routerAuthorization[req.method].Individual_Authorize.indexOf(
          req.decode.UserTypeName
        ) != -1
      ) {
        const findBlog = await blogTransactions.findAsync(req.body.BlogID);
        if (findBlog.UserID != req.decode.UserID) {
          res
            .status(HttpStatusCode.UNAUTHORIZED)
            .send("Unauthorized transaction !");
          return;
        }
      }
      const result = await blogTransactions.deleteAsync(req.body.BlogID);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get(
  "/blog/:BlogID",
  tokenControl,
  authControl,
  blogValidator.find,
  async (req, res) => {
    try {
      const result = await blogTransactions.findAsync(req.params.BlogID);
      if (
        routerAuthorization[req.method].Individual_Authorize.indexOf(
          req.decode.UserTypeName
        ) != -1
      ) {
        if (result.UserID != req.decode.UserID) {
          res
            .status(HttpStatusCode.UNAUTHORIZED)
            .send("Unauthorized transaction !");
          return;
        }
      }
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get("/blog", blogValidator.list, async (req, res) => {
  try {
    if (req.query.BlogState != undefined)
      req.query.BlogState = req.query.BlogState ? 1 : 0;
    const result = await blogTransactions.listAsync(req.query);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

module.exports = router;
