/**
 * Model for collected logs (stored on the front in memory).
 *
 * @namespace Fl32_Log_Server_Front_Mod_Logs
 */
export default class Fl32_Log_Server_Front_Mod_Logs {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {TeqFw_Web_Api_Front_Web_Connect} */
        const connApi = spec['TeqFw_Web_Api_Front_Web_Connect$'];
        /** @type {Fl32_Log_Server_Shared_Web_Api_Logs_List} */
        const apiList = spec['Fl32_Log_Server_Shared_Web_Api_Logs_List$'];
        /** @type {Fl32_Log_Shared_Dto_Log} */
        const dtoLog = spec['Fl32_Log_Shared_Dto_Log$'];
        /** @type {TeqFw_Db_Shared_Dto_Order} */
        const dtoOrder = spec['TeqFw_Db_Shared_Dto_Order$'];
        /** @type {TeqFw_Db_Shared_Dto_List_Selection} */
        const dtoSelection = spec['TeqFw_Db_Shared_Dto_List_Selection$'];
        /** @type {typeof TeqFw_Db_Shared_Dto_Order.DIRECTION} */
        const DIRECTION = spec['TeqFw_Db_Shared_Dto_Order.DIRECTION$'];

        // VARS
        logger.setNamespace(this.constructor.name);
        const A_LOG = dtoLog.getAttributes();
        const MAX = 100;
        /** @type {Fl32_Log_Shared_Dto_Log.Dto[]} */
        const _store = [];


        // FUNCS


        // INSTANCE METHODS

        /**
         * Add one log item to the stored set.
         * @param {Fl32_Log_Shared_Dto_Log.Dto} dto
         * @return {Fl32_Log_Shared_Dto_Log.Dto[]}
         */
        this.addEntry = function (dto) {
            if (dto?.bid) _store.unshift(dto);
            if (_store.length > 10) _store.length = MAX;
            return _store;
        };

        /**
         * Load a list of log entries according to the given selection criteria.
         * @param {TeqFw_Db_Shared_Dto_List_Selection.Dto} selection
         * @return {Promise<Fl32_Log_Shared_Dto_Log.Dto[]>}
         */
        this.list = async function (selection) {
            _store.length = 0;
            try {
                const req = apiList.createReq();
                if (selection) req.selection = selection;
                else {
                    const sel = dtoSelection.createDto();
                    sel.rowsLimit = 50;
                    sel.rowsOffset = 0;
                    sel.orderBy = [];
                    const order = dtoOrder.createDto();
                    order.alias = A_LOG.DATE;
                    order.dir = DIRECTION.DESC;
                    sel.orderBy.push(order);
                    req.selection = sel;
                }
                // noinspection JSValidateTypes
                /** @type {Fl32_Log_Server_Shared_Web_Api_Logs_List.Response} */
                const res = await connApi.send(req, apiList);
                if (res?.items?.length) _store.push(...res.items);
                return _store;
            } catch (e) {
                // timeout or error
                logger.error(`Cannot load list of log entries. Error: ${e?.message}`);
            }
            return _store;
        };

    }
}
