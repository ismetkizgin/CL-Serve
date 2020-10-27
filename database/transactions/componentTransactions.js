const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class ComponentTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblComponent SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Component registration completed.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Error while registering component !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such component !' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    updateAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`UPDATE tblComponent SET ? WHERE ComponentID=?`, [values, values.ComponentID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Component information has been updated.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'An error occurred while updating component information !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such component menu !' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    findAsync(ComponentID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM vwComponentList WHERE ComponentID=?`, [ComponentID], (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result[0]);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No component registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    deleteAsync(ComponentID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`DELETE FROM tblComponent WHERE ComponentID=?`, [ComponentID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Deletion succeeded.');
                    else
                        reject({ status: HttpStatusCode.GONE, message: 'There is no such component !' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    listAsync(values) {
        const limitAndOffset = values.offset == null ? `${values.limit == null ? '' : `LIMIT ${values.limit}`}` : `LIMIT ${values.offset},${values.limit}`;
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM vwComponentList ${values.ComponentState != null ? `WHERE ComponentState=${values.ComponentState}` : ''} ORDER BY ComponentName ASC ${limitAndOffset}`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No component registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }
}

module.exports = ComponentTransactions;