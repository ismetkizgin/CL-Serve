const { mysqlDataContext } = require("../dataContexts");
const HttpStatusCode = require("http-status-codes");
const { sqlHelper } = require("../../utils");
const Md5 = require("md5");

class UserTransactions {
  constructor() {
    this._datacontext = mysqlDataContext.connection();
  }

  loginAsync(values) {
    return new Promise((resolve, reject) => {
      if (values.UserPassword) values.UserPassword = Md5(values.UserPassword);
      this._datacontext.query(
        `SELECT * FROM tblUser ${sqlHelper.getWhere(values)}`,
        (error, result) => {
          if (!error) {
            if (result.length) {
              resolve(result[0]);
            } else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message: "There is no such user !",
              });
          } else
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
        }
      );
    });
  }

  listAsync(values) {
    const limitAndOffset =
      values.offset == null
        ? `${values.limit == null ? "" : `LIMIT ${values.limit}`}`
        : `LIMIT ${values.offset},${values.limit}`;
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM vwUserList ORDER BY UserFirstName, UserLastName ASC ${limitAndOffset}`,
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result);
            else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message: "No user registered to the system was found.",
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
          }
        }
      );
    });
  }

  findAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM vwUserList WHERE UserID=?`,
        [values.UserID],
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result[0]);
            else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message: "No user registered to the system was found.",
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
          }
        }
      );
    });
  }

  passwordControlAsync(values) {
    return new Promise((resolve, reject) => {
      values.UserPassword = Md5(values.UserPassword);
      this._datacontext.query(
        `SELECT * FROM tblUser WHERE UserPassword=? AND UserID=? `,
        [values.UserPassword, values.UserID],
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result[0]);
            else
              reject({
                status: HttpStatusCode.BAD_REQUEST,
                message: "User password does not match !",
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
          }
        }
      );
    });
  }

  deleteAsync(UserID) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `DELETE FROM tblUser WHERE UserID=?`,
        [UserID],
        (error, result) => {
          if (!error) {
            if (result.affectedRows) resolve("Deletion succeeded.");
            else
              reject({
                status: HttpStatusCode.GONE,
                message: "There is no such user.",
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
          }
        }
      );
    });
  }

  updateAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `UPDATE tblUser SET ? WHERE UserID=?`,
        [values, values.UserID],
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve("User information has been updated.");
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "An error occurred while updating user information.",
              });
          } else {
            reject(
              error.errno == 1062
                ? {
                    status: HttpStatusCode.CONFLICT,
                    message: "There is such user.",
                  }
                : {
                    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    message: error.message,
                  }
            );
          }
        }
      );
    });
  }

  insertAsync(values) {
    return new Promise((resolve, reject) => {
      values.UserPassword = Md5(values.UserPassword);
      this._datacontext.query(
        `INSERT INTO tblUser SET ?`,
        values,
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve("User registration has taken place.");
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "Error while registering user !",
              });
          } else {
            reject(
              error.errno == 1062
                ? {
                    status: HttpStatusCode.CONFLICT,
                    message: "There is such user.",
                  }
                : {
                    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    message: error.message,
                  }
            );
          }
        }
      );
    });
  }

  changePasswordAsync(values) {
    return new Promise((resolve, reject) => {
      values.UserPassword = Md5(values.UserPassword);
      values.UserNewPassword = Md5(values.UserNewPassword);
      this._datacontext.query(
        `UPDATE tblUser SET UserPassword=? WHERE UserPassword=? AND UserID=?`,
        [values.UserNewPassword, values.UserPassword, values.UserID],
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve("The user password has been changed successfully.");
            else
              reject({
                status: HttpStatusCode.BAD_REQUEST,
                message: "User password does not match.",
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
          }
        }
      );
    });
  }

  forgotChangePasswordAsync(values) {
    return new Promise((resolve, reject) => {
      values.UserNewPassword = Md5(values.UserNewPassword);
      this._datacontext.query(
        `UPDATE tblUser SET UserPassword=? WHERE UserPassword=? AND UserEmail=?`,
        [values.UserNewPassword, values.UserPassword, values.UserEmail],
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve("The user password has been changed successfully.");
            else
              reject({
                status: HttpStatusCode.BAD_REQUEST,
                message: "User password does not match.",
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
          }
        }
      );
    });
  }

  statusFindAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT vwUserList.* FROM vwUserList LEFT JOIN tblUserType ON vwUserList.UserTypeName=tblUserType.UserTypeName WHERE tblUserType.UserTypeNumber<(SELECT UserTypeNumber FROM tblUserType WHERE UserTypeName=?) AND UserID=?`,
        [values.UserTypeName, values.UserID],
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result[0]);
            else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message: "No user registered to the system was found.",
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
          }
        }
      );
    });
  }
}

module.exports = UserTransactions;
