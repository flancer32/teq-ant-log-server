/**
 * Grid for list of log items.
 *
 * @namespace Fl32_Log_Server_Front_Ui_Route_Home_Grid
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Front_Ui_Route_Home_Grid';
const EVT_SELECT = 'onSelect';

// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * @interface
 * @mixin
 * @memberOf Fl32_Log_Server_Front_Ui_Route_Home_Grid
 */
class IUi {
    /**
     * @param {Fl32_Log_Shared_Dto_Log.Dto[]} items
     */
    displayItems(items) {}
}

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @returns {Fl32_Log_Server_Front_Ui_Route_Home_Grid.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl32_Log_Server_Front_Defaults} */
    const DEF = spec['Fl32_Log_Server_Front_Defaults$'];
    /** @type {Fl32_Log_Shared_Dto_Log} */
    const dtoItem = spec['Fl32_Log_Shared_Dto_Log$'];
    /** @type {TeqFw_Di_Shared_Api_IProxy} */
    const proxyPresList = spec['Fl32_Log_Server_Front_Present_List@']; // proxy
    /** @type {Fl32_Log_Server_Front_Ui_Route_Home_A_Item.vueCompTmpl} */
    const uiRow = spec['Fl32_Log_Server_Front_Ui_Route_Home_A_Item$'];

    // VARS
    const template = `
<div>
    <table>
        <ui-row v-for="one in items" :item="one" class="" v-on:click="onRowClick(one)"/>
    </table>
</div>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Log_Server_Front_Ui_Route_Home_Grid
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiRow},
        data() {
            return {
                /** @type {Fl32_Log_Shared_Dto_Log.Dto[]} */
                items: [],
            };
        },
        computed: {},
        /**
         * @mixes Fl32_Log_Server_Front_Ui_Route_Home_Grid.IUi
         */
        methods: {
            displayItems(items) {
                this.items.length = 0;
                this.items.push(...items);
            },
            /**
             *
             * @param {Fl32_Log_Shared_Dto_Log.Dto} item
             */
            onRowClick(item) {
                const cloned = dtoItem.createDto(item);
                this.$emit(EVT_SELECT, cloned);
            },
        },
        emits: [EVT_SELECT],
        async created() {
            // bind itself into List Presenter
            // noinspection JSValidateTypes
            /**
             * Smell code :( PROXY is not well done concept yet
             * @type {Fl32_Log_Server_Front_Present_List}
             */
            const presList = (proxyPresList?.setViewGrid) ? proxyPresList : await proxyPresList.create;
            presList.setViewGrid(this);
        },
    };
}
