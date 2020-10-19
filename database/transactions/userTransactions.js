const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class UserTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    loginAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblUser where UserEmail=? and UserPassword=?`, [values.UserEmail, values.UserPassword], (error, result) => {
                if (!error) {
                    if (result.length) {
                        delete result[0].UserPassword;
                        resolve(result[0]);
                    }
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'There is no such user !' });
                }
                else
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
            });
        });
    }

    listAsync(values) {
        const limitAndOffset = values.offset == null ? `${values.limit == null ? '' : `LIMIT ${values.limit}`}` : `LIMIT ${values.offset},${values.limit}`;
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT vwUserList.* FROM vwUserList LEFT JOIN tblUserType ON vwUserList.UserTypeName=tblUserType.UserTypeName WHERE tblUserType.UserTypeNumber<(SELECT UserTypeNumber FROM tblUserType WHERE UserTypeName='Root') ORDER BY UserFirstName, UserLastName ASC ${limitAndOffset}`, [values.UserTypeName], (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No user registered to the system was found.' });
                }
                else {
                    reject({ status: 500, message: error.message });
                }
            });
        });
    }
}

module.exports = UserTransactions;