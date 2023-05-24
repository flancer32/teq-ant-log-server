/**
 * Screen for 'Not Found' page (error 404).
 *
 * @namespace Fl32_Log_Server_Front_Ui_Route_NotFound
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Front_Ui_Route_NotFound';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @returns {Fl32_Log_Server_Front_Ui_Route_NotFound.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl32_Log_Server_Front_Defaults} */
    const DEF = spec['Fl32_Log_Server_Front_Defaults$'];

    // VARS
    const template = `
<layout-main>
    <div class="text-center">The page is not found.</div>
</layout-main>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Log_Server_Front_Ui_Route_NotFound
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
    };
}
