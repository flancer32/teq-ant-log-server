/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Back_Plugin_Init';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Shared_Api_Logger} */
    const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
    /** @type {TeqFw_Db_Back_Process_CreateStruct} */
    const procCreateDb = spec['TeqFw_Db_Back_Process_CreateStruct$'];
    /** @type {Fl32_Log_Server_Back_RDb_Schema_Log} */
    const rdbLog = spec['Fl32_Log_Server_Back_RDb_Schema_Log$'];

    // VARS
    logger.setNamespace(NS);

    // FUNCS
    async function init() {
        await procCreateDb.run({meta: rdbLog});
    }

    // MAIN
    Object.defineProperty(init, 'namespace', {value: NS});
    return init;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
