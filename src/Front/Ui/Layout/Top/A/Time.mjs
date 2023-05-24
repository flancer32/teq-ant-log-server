/**
 * Display time.
 *
 * @namespace Fl32_Log_Server_Front_Ui_Layout_Top_A_Time
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Front_Ui_Layout_Top_A_Time';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Log_Server_Front_Ui_Layout_Top_A_Time
 * @returns {Fl32_Log_Server_Front_Ui_Layout_Top_A_Time.vueCompTmpl}
 */
export default function (spec) {
    // DEPS
    /** @type {Fl32_Log_Server_Front_Defaults} */
    const DEF = spec['Fl32_Log_Server_Front_Defaults$'];
    /** @type {TeqFw_Core_Shared_Util_Format.timeUtc|function} */
    const formatTime = spec['TeqFw_Core_Shared_Util_Format.timeUtc'];

    // VARS
    const template = `
<div>{{time}} UTC</div>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Log_Server_Front_Ui_Layout_Top_A_Time
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                intervalId: null,
                time: formatTime(),
            };
        },
        created() {
            if (this.intervalId === null)
                this.intervalId = setInterval(() => this.time = formatTime(), 1000);
        },
        unmounted() {
            if (this.intervalId !== null)
                clearInterval(this.intervalId);
        }
    };
}