const router = require("express")();
const jwt = require("jsonwebtoken");
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken } = require("../middleware");
const userTransactions = TransactionsFactory.creating("userTransactions");
const authValidator = validators.authValidator;
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require("http-status-codes");
const moment = require("moment");
const Roles = require("../models/roles");
const Handlebars = require("../utils/handlebarsUtils");
const EmailSenderFactory = require("../utils/email/emailSenderFactory");
const { smtpEmail } = require("../utils/config");

router.post("/login", authValidator.login, async (req, res) => {
  try {
    const result = await userTransactions.loginAsync(req.body);
    const payload = {
      UserID: result.UserID,
      UserTypeName: result.UserTypeName,
    };
    const token = jwt.sign(payload, req.app.get("api_key"), {
      expiresIn: "7d",
    });
    res.json({ result, token });
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.post("/sign-up", authValidator.signUp, async (req, res) => {
  try {
    req.body.UserDateOfBirth = moment(
      new Date(req.body.UserDateOfBirth)
    ).format("YYYY/MM/DD");
    req.body.UserTypeName = Roles.User;
    const result = await userTransactions.insertAsync(req.body);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.delete(
  "/my-account",
  tokenControl,
  authValidator.delete,
  async (req, res) => {
    try {
      const result = await userTransactions.deleteAsync(req.decode.UserID);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  "/my-account",
  tokenControl,
  authValidator.update,
  async (req, res) => {
    try {
      await userTransactions.passwordControlAsync({
        UserID: req.decode.UserID,
        UserPassword: req.body.UserPassword,
      });
      req.body.UserDateOfBirth = moment(
        new Date(req.body.UserDateOfBirth)
      ).format("YYYY/MM/DD");
      const result = await userTransactions.updateAsync(
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
  "/change-password",
  tokenControl,
  authValidator.changePassword,
  async (req, res) => {
    try {
      const result = await userTransactions.changePasswordAsync(
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
  "/password-control",
  tokenControl,
  authValidator.passwordControl,
  async (req, res) => {
    try {
      const result = await userTransactions.passwordControlAsync({
        UserID: req.decode.UserID,
        UserPassword: req.body.UserPassword,
      });
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post("/forgot-password", async (req, res) => {
  try {
    const result = await userTransactions.loginAsync({
      UserEmail: req.body.UserEmail,
    });

    const emailSender = EmailSenderFactory.create(
      "nodemailerEmailSender",
      smtpEmail
    );

    const htmlSource = await Handlebars.createTemplateAsync(
      "handlebarsTemplates/forgot-password.html",
      {
        name: result.UserFirstName,
        forgotPasswordKey: result.UserPassword,
      }
    );

    const mailResponse = await emailSender.sendEmailAsync({
      from: `Code My Life <${"noreply@@codemylife.com"}>`,
      to: result.UserEmail,
      subject: "Code My Life Şifremi Unuttum !",
      html: htmlSource,
    });
    res.json(mailResponse);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.get("/token-decode", tokenControl, async (req, res) => {
  res.json(req.decode);
});

module.exports = router;
