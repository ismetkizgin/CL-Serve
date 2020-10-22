const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class LanguagesTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    listAsync() {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblLanguages`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'The language option registered in the system was not found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }
}

module.exports = LanguagesTransactions;