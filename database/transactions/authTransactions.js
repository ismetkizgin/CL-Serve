const { mysqlDataContext } = require("../dataContexts");
const HttpStatusCode = require("http-status-codes");

class AuthTransactions {
  constructor() {
    this.datacontext = mysqlDataContext.connection();
  }

  additiveUserTypesAsync(UserTypeName) {
    return new Promise((resolve, reject) => {
      this.datacontext.query(
        `CALL prAdditiveUserTypes(?)`,
        [UserTypeName],
        (error, result) => {
          if (!error) {
            if (result.length) resolve(result[0]);
            else reject({ status: HttpStatusCode.NOT_FOUND, message: "" });
          } else
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
            });
        }
      );
    });
  }
}

module.exports = AuthTransactions;
