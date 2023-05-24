/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl32_Log_Server_Front_Defaults {

    ROUTE_HOME = '/';
    ROUTE_NOT_FOUND = '/:pathMatch(.*)*';
    ROUTE_SETTINGS = '/settings';

    /** @type {Fl32_Log_Server_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Fl32_Log_Server_Shared_Defaults$'];
        Object.freeze(this);
    }
}
