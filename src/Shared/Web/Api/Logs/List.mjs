/**
 * Load log items on demand.
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Shared_Web_Api_Logs_List';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Log_Server_Shared_Web_Api_Logs_List
 */
class Request {
    static namespace = NS;
    /** @type {TeqFw_Db_Shared_Dto_List_Selection.Dto} */
    selection;
}

/**
 * @memberOf Fl32_Log_Server_Shared_Web_Api_Logs_List
 */
class Response {
    static namespace = NS;
    /**
     * @type {Fl32_Log_Shared_Dto_Log.Dto[]}
     */
    items;
    /**
     * Total number of rows matching given selection.
     * @type {number}
     */
    rowsTotal;
    /**
     * @type {TeqFw_Db_Shared_Dto_List_Selection.Dto}
     */
    selection;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Fl32_Log_Server_Shared_Web_Api_Logs_List {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castArrayOfObj|function} */
        const castArrayOfObj = spec['TeqFw_Core_Shared_Util_Cast.castArrayOfObj'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {Fl32_Log_Shared_Dto_Log} */
        const dtoItem = spec['Fl32_Log_Shared_Dto_Log$'];
        /** @type {TeqFw_Db_Shared_Dto_List_Selection} */
        const dtoSelection = spec['TeqFw_Db_Shared_Dto_List_Selection$'];

        // INSTANCE METHODS

        /**
         * @param {Fl32_Log_Server_Shared_Web_Api_Logs_List.Request} [data]
         * @return {Fl32_Log_Server_Shared_Web_Api_Logs_List.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.selection = dtoSelection.createDto(data?.selection);
            return res;
        };

        /**
         * @param {Fl32_Log_Server_Shared_Web_Api_Logs_List.Response} [data]
         * @returns {Fl32_Log_Server_Shared_Web_Api_Logs_List.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.items = castArrayOfObj(data?.items, dtoItem.createDto);
            res.rowsTotal = castInt(data?.rowsTotal);
            res.selection = dtoSelection.createDto(data?.selection);
            return res;
        };
    }

}
