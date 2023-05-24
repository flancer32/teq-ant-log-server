/**
 * Presenter for list of log items.
 */
// MODULE'S VARS


// MODULE'S INTERFACES

// MODULE'S CLASSES
export default class Fl32_Log_Server_Front_Present_List {
    constructor(spec) {
        // DEPS
        /** @type {Fl32_Log_Server_Front_Mod_Logs} */
        const modLogs = spec['Fl32_Log_Server_Front_Mod_Logs$'];

        // VARS
        /** @type {Fl32_Log_Server_Front_Ui_Route_Home_Grid.IUi} */
        let _viewGrid;

        // INSTANCE METHODS

        /**
         * Add one log item to the stored set and display it on UI.
         *
         * @param {Fl32_Log_Shared_Dto_Log.Dto} dto
         * @return {Promise<void>}
         */
        this.addEntry = async function (dto) {
            if (dto?.bid) {
                const items = modLogs.addEntry(dto);
                _viewGrid.displayItems(items);
            }
        };

        this.clean = function () {

        };

        /**
         * Load initial list of log items from the back.
         * @return {Promise<void>}
         */
        this.load = async function () {
            const items = await modLogs.list(null);
            _viewGrid.displayItems(items);
        };

        this.reload = function () {

        };

        /**
         * @param {Fl32_Log_Server_Front_Ui_Route_Home_Grid.IUi} view
         */
        this.setViewGrid = function (view) {
            _viewGrid = view;
        };

    }
}
