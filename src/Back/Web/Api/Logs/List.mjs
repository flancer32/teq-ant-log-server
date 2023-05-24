/**
 * Load log items on demand.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Fl32_Log_Server_Back_Web_Api_Logs_List {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {Fl32_Log_Server_Shared_Web_Api_Logs_List} */
        const endpoint = spec['Fl32_Log_Server_Shared_Web_Api_Logs_List$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_CrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_CrudEngine$'];
        /** @type {Fl32_Log_Server_Back_RDb_Schema_Log} */
        const rdbLog = spec['Fl32_Log_Server_Back_RDb_Schema_Log$'];
        /** @type {Fl32_Log_Server_Back_Convert_Log} */
        const convLog = spec['Fl32_Log_Server_Back_Convert_Log$'];
        /** @type {TeqFw_Db_Shared_Util_List.getOrderFromSelection|function} */
        const getOrderFromSelection = spec['TeqFw_Db_Shared_Util_List.getOrderFromSelection'];

        // VARS
        logger.setNamespace(this.constructor.name);

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Fl32_Log_Server_Shared_Web_Api_Logs_List.Request|Object} req
         * @param {Fl32_Log_Server_Shared_Web_Api_Logs_List.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            // FUNCS

            // MAIN
            const trx = await conn.startTransaction();
            try {
                // get and normalize input data
                /** @type {[{column: string, order: string}]} */
                const order = getOrderFromSelection(req?.selection);
                const limit = req.selection?.rowsLimit ?? 10;
                const offset = req.selection?.rowsOffset ?? 0;
                //
                const items = [];
                res.rowsTotal = await crud.readSetCount(trx, rdbLog);
                const found = await crud.readSet(trx, rdbLog, null, null, order, limit, offset);
                for (const one of found) items.push(convLog.rdb2share(one));
                await trx.commit();
                res.items = items;
                res.selection = req.selection;
            } catch (error) {
                logger.error(error);
                await trx.rollback();
            }
        };
    }

}
