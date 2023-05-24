/**
 * New log entry is aggregated.
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Shared_Web_Event_Back_Log_Added';

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Log_Server_Shared_Web_Event_Back_Log_Added
 */
class Dto {
    static namespace = NS;
    /**
     * Selected items.
     * @type {Fl32_Log_Shared_Dto_Log.Dto}
     */
    item;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl32_Log_Server_Shared_Web_Event_Back_Log_Added {
    constructor(spec) {
        // DEPS
        /** @type {Fl32_Log_Shared_Dto_Log} */
        const dtoLog = spec['Fl32_Log_Shared_Dto_Log$'];

        // INSTANCE METHODS
        /**
         * @param {Fl32_Log_Server_Shared_Web_Event_Back_Log_Added.Dto} [data]
         * @return {Fl32_Log_Server_Shared_Web_Event_Back_Log_Added.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.item = dtoLog.createDto(data?.item);
            return res;
        }
    }
}
