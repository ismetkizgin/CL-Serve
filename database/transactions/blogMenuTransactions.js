const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class BlogMenuTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblBlogMenu SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Blog menu registration completed.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Error while registering blog menu !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such blog menu.' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }
}

module.exports = BlogMenuTransactions;