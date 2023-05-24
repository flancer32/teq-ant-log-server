/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Fl32_Log_Server_Back_Defaults {

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {Fl32_Log_Server_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.MOD_WEB = spec['TeqFw_Web_Back_Defaults$'];
        this.SHARED = spec['Fl32_Log_Server_Shared_Defaults$'];
        Object.freeze(this);
    }
}
