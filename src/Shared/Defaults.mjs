/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class Fl32_Log_Server_Shared_Defaults {
    // should be the same as `name` property in `./package.json`
    NAME = '@flancer32/teq-ant-log-server';


    /** @type {Fl32_Log_Shared_Defaults} */
    MOD_LOG;

    constructor(spec) {
        this.MOD_LOG = spec['Fl32_Log_Shared_Defaults$'];
        Object.freeze(this);
    }
}
