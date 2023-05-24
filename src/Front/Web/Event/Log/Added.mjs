/**
 * Process one log item received from back.
 *
 * @namespace Fl32_Log_Server_Front_Web_Event_Log_Added
 */
// MODULE'S CLASSES
export default class Fl32_Log_Server_Front_Web_Event_Log_Added {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Event_Front_Mod_Channel} */
        const eventsFront = spec['TeqFw_Web_Event_Front_Mod_Channel$'];
        /** @type {Fl32_Log_Server_Shared_Web_Event_Back_Log_Added} */
        const esbAdded = spec['Fl32_Log_Server_Shared_Web_Event_Back_Log_Added$'];
        /** @type {Fl32_Log_Server_Front_Present_List} */
        const presList = spec['Fl32_Log_Server_Front_Present_List$'];
        /** @type {Fl32_Log_Shared_Dto_Log} */
        const dtoLog = spec['Fl32_Log_Shared_Dto_Log$'];

        // MAIN
        eventsFront.subscribe(esbAdded, onEvent);

        // FUNCS
        /**
         * New log entry is added on the back. Add log entry to internal store (model).
         * @param {Fl32_Log_Server_Shared_Web_Event_Back_Log_Added.Dto} data
         */
        function onEvent({data}) {
            // cast types for event message data
            const dto = dtoLog.createDto(data?.item);
            presList.addEntry(dto).catch();
        }

    }
}
