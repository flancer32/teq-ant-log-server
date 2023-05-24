/**
 * Common process to save log entry and publish it to all connected clients.
 *
 * @namespace Fl32_Log_Server_Back_Web_Handler_Beacon_A_Process
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Back_Web_Handler_Beacon_A_Process';

// MODULE'S FUNCTIONS
export default function (spec) {
    // DEPS
    /** @type {TeqFw_Core_Shared_Api_Logger} */
    const logger = spec['TeqFw_Core_Shared_Api_Logger$']; // instance
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Db_Back_Api_RDb_CrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_CrudEngine$'];
    /** @type {Fl32_Log_Server_Back_RDb_Schema_Log} */
    const rdbLog = spec['Fl32_Log_Server_Back_RDb_Schema_Log$'];
    /** @type {TeqFw_Web_Event_Back_Mod_Portal_Front} */
    const portalFront = spec['TeqFw_Web_Event_Back_Mod_Portal_Front$'];
    /** @type {Fl32_Log_Server_Back_Convert_Log} */
    const convLog = spec['Fl32_Log_Server_Back_Convert_Log$'];
    /** @type {TeqFw_Web_Event_Back_Mod_Registry_Stream} */
    const modRegStream = spec['TeqFw_Web_Event_Back_Mod_Registry_Stream$'];
    /** @type {Fl32_Log_Server_Shared_Web_Event_Back_Log_Added} */
    const esbLogAdded = spec['Fl32_Log_Server_Shared_Web_Event_Back_Log_Added$'];

    // VARS
    logger.setNamespace(NS);
    const ATTR = rdbLog.getAttributes();

    // FUNCS
    /**
     * @param {Fl32_Log_Shared_Dto_Log.Dto} log
     * @memberOf Fl32_Log_Server_Back_Web_Handler_Beacon_A_Process
     */
    function process(log) {
        // FUNCS
        /**
         * Save log to RDB and populate with BID.
         * @param {Fl32_Log_Shared_Dto_Log.Dto} log
         * @returns {Promise<Fl32_Log_Shared_Dto_Log.Dto>}
         */
        async function save(log) {
            const trx = await rdb.startTransaction();
            try {
                // save shared DTO into RDB
                const entry = convLog.share2rdb(log);
                // save log item to RDB
                const {[ATTR.BID]: bid} = await crud.create(trx, rdbLog, entry);
                log.bid = bid;
                await trx.commit();
                return log;
            } catch (e) {
                logger.error(e);
                await trx.rollback();
            }
        }

        /**
         * @param {Fl32_Log_Shared_Dto_Log.Dto} log
         */
        function publish(log) {
            // publish item to connected fronts
            for (const one of modRegStream.getAllActive()) {
                const {meta} = portalFront.createMessage();
                meta.sessionUuid = one.sessionUuid;
                const data = esbLogAdded.createDto();
                data.item = log;
                // noinspection JSCheckFunctionSignatures
                portalFront.publish({data, meta}).catch(logger.error);
            }
        }

        // MAIN
        save(log)
            .then(publish)
            .catch(logger.error);
    }

    // MAIN
    Object.defineProperty(process, 'namespace', {value: NS});
    return process;
}