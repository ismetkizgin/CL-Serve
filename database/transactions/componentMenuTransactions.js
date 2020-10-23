const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class ComponentMenuTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    listAsync(values) {
        const limitAndOffset = values.offset == null ? `${values.limit == null ? '' : `LIMIT ${values.limit}`}` : `LIMIT ${values.offset},${values.limit}`;
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblComponentMenu ORDER BY ComponentMenuName ASC ${limitAndOffset}`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No component menu registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    findAsync(ComponentMenuID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblComponentMenu WHERE ComponentMenuID=?`, [ComponentMenuID], (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result[0]);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No component menu registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblComponentMenu SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Component menu registration completed.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Error while registering component menu !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such component menu.' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    updateAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`UPDATE tblComponentMenu SET ? WHERE ComponentMenuID=?`, [values, values.ComponentMenuID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Component menu information has been updated.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'An error occurred while updating component menu information !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such component menu.' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    deleteAsync(ComponentMenuID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`DELETE FROM tblComponentMenu WHERE ComponentMenuID=?`, [ComponentMenuID], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Deletion succeeded.');
                    else
                        reject({ status: HttpStatusCode.GONE, message: 'There is no such component menu !' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }
}

module.exports = ComponentMenuTransactions;