const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class ComponentMenuTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    listAsync(values) {
        const limitAndOffset = values.offset == null ? `${values.limit == null ? '' : `LIMIT ${values.limit}`}` : `LIMIT ${values.offset},${values.limit}`;
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM vwComponentMenuList WHERE LangueID=? ORDER BY ComponentMenuName ASC ${limitAndOffset}`, [values.LangueID], (error, result) => {
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

    findAsync(componentMenuID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM vwComponentMenuList WHERE ComponentMenuID=?`, [componentMenuID], (error, result) => {
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
}

module.exports = ComponentMenuTransactions;