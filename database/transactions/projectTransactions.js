const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class ProjectTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    listAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM vwProjectList ${sqlHelper.getWhere(values)} ORDER BY ProjectCreatedDate desc ${sqlHelper.getLimitOffset(values)}`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No project registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    deleteAsync(ProjectID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`DELETE FROM tblProject WHERE ProjectID=?`, [ProjectID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Deletion succeeded.');
                    else
                        reject({ status: HttpStatusCode.GONE, message: 'There is no such project !' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }
}

module.exports = ProjectTransactions;