/**
 * Home page.
 *
 * @namespace Fl32_Log_Server_Front_Ui_Route_Home
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Front_Ui_Route_Home';
const REF_GRID = 'grid';

// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * @interface
 * @mixin
 * @memberOf Fl32_Log_Server_Front_Ui_Route_Home
 */
class IUi {
    /**
     * @param {Fl32_Log_Shared_Dto_Log.Dto[]} items
     * @param {TeqFw_Db_Shared_Dto_List_Selection.Dto} selection
     */
    refresh(items, selection) {};
}

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @returns {Fl32_Log_Server_Front_Ui_Route_Home.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl32_Log_Server_Front_Defaults} */
    const DEF = spec['Fl32_Log_Server_Front_Defaults$'];
    /** @type {Fl32_Log_Server_Front_Ui_Route_Home_A_Item.vueCompTmpl} */
    const uiItem = spec['Fl32_Log_Server_Front_Ui_Route_Home_A_Item$'];
    /** @type {Fl32_Log_Server_Front_Ui_Route_Home_Grid.vueCompTmpl} */
    const uiGrid = spec['Fl32_Log_Server_Front_Ui_Route_Home_Grid$'];
    /** @type {Fl32_Log_Server_Front_Present_List} */
    const presList = spec['Fl32_Log_Server_Front_Present_List$'];

    // VARS
    const template = `
<layout-main>
    <ui-grid ref="${REF_GRID}" @onSelect="doItemSelect"/>
</layout-main>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Log_Server_Front_Ui_Route_Home
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiItem, uiGrid},
        data() {
            return {
                /** @type {Fl32_Log_Shared_Dto_Log.Dto[]} */
                items: [],
                uiRenderKey: 0,
            };
        },
        /**
         * @mixes Fl32_Log_Server_Front_Ui_Route_Home.IUi
         */
        methods: {
            /**
             * @param {Fl32_Log_Shared_Dto_Log.Dto[]} items
             * @param {TeqFw_Db_Shared_Dto_List_Selection.Dto} selection
             */
            refresh(items, selection) {
                this.items = items;
                this.uiRenderKey++;
            },
            refreshList() {
                /** @type {Fl32_Log_Server_Front_Ui_Route_Home_Grid.IUi} */
                const ui = this.$refs[REF_GRID];
                ui.refresh(this);
            },
        },
        async mounted() {
            presList.load().catch();
        },
    };
}
