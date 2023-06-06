/**
 * The top navigation.
 *
 * @namespace Fl32_Log_Server_Front_Ui_Layout_Top
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Front_Ui_Layout_Top';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Log_Server_Front_Ui_Layout_Top
 * @returns {Fl32_Log_Server_Front_Ui_Layout_Top.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl32_Log_Server_Front_Defaults} */
    const DEF = spec['Fl32_Log_Server_Front_Defaults$'];
    /** @type {Fl32_Log_Server_Front_Ui_Layout_Top_A_Time.vueCompTmpl} */
    const teqTime = spec['Fl32_Log_Server_Front_Ui_Layout_Top_A_Time$'];
    /** @type {TeqFw_Ui_Quasar_Front_Lib_Led_Connect.vueCompTmpl} */
    const uiLed = spec['TeqFw_Ui_Quasar_Front_Lib_Led_Connect$'];

    // DEFINE WORKING VARS & PROPS
    logger.setNamespace(NS);
    const template = `
<q-toolbar>
    <q-btn dense flat round icon="home" to="${DEF.ROUTE_HOME}"/>
<!--    <q-btn dense flat round icon="settings" to="${DEF.ROUTE_SETTINGS}"/>-->
    <q-btn dense flat round icon="refresh" v-on:click="cleanLogs" v-if="displayRefresh"/>
    <q-space></q-space>
    <q-toolbar-title>TeqFW Logs</q-toolbar-title>
    <q-space></q-space>
    <teq-time/>
    <ui-led/>
</q-toolbar>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Log_Server_Front_Ui_Layout_Top
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {teqTime, uiLed},
        computed: {
            displayRefresh() {
                return this.$route.path === DEF.ROUTE_HOME;
            }
        },
        methods: {
            cleanLogs() {
                // modLogs.clear();
            },
        },
    };
}