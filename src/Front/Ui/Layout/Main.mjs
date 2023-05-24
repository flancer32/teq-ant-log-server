/**
 * Main layout for UI.
 *
 * @namespace Fl32_Log_Server_Front_Ui_Layout_Main
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Front_Ui_Layout_Main';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl32_Log_Server_Front_Ui_Layout_Main
 * @returns {Fl32_Log_Server_Front_Ui_Layout_Main.vueCompTmpl}
 */
export default function (spec) {
    // DEPS
    /** @type {Fl32_Log_Server_Front_Defaults} */
    const DEF = spec['Fl32_Log_Server_Front_Defaults$'];
    /** @type {Fl32_Log_Server_Front_Ui_Layout_Top.vueCompTmpl} */
    const topBar = spec['Fl32_Log_Server_Front_Ui_Layout_Top$'];

    // VARS
    const template = `
<q-layout view="lHr lpR lFr">

    <q-header bordered elevated class="bg-primary text-white">
        <top-bar/>
    </q-header>

    <q-page-container style="display: grid; height: 100vh; justify-items: center;">
        <slot/>
    </q-page-container>

</q-layout>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Log_Server_Front_Ui_Layout_Main
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {topBar},
    };
}