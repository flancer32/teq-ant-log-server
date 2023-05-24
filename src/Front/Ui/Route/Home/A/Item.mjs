/**
 * UI component to display a log item.
 *
 * @namespace Fl32_Log_Server_Front_Ui_Route_Home_A_Item
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Front_Ui_Route_Home_A_Item';

// MODULE'S FUNCTIONS
/**
 * Convert date as UTC to HH:MM:SS.MMM.
 * @param {Date} date
 * @return {string}
 */
function formatDateTimeForLog(date) {
    const h = `${date.getUTCHours()}`.padStart(2, '0');
    const i = `${date.getUTCMinutes()}`.padStart(2, '0');
    const s = `${date.getUTCSeconds()}`.padStart(2, '0');
    const m = `${date.getUTCMilliseconds()}`.padStart(3, '0');
    return `${h}:${i}:${s}.${m}`;
}


/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl32_Log_Server_Front_Ui_Route_Home_A_Item.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl32_Log_Server_Front_Defaults} */
    const DEF = spec['Fl32_Log_Server_Front_Defaults$'];
    /** @type {typeof Fl32_Log_Shared_Enum_Log_Level} */
    const LEVEL = spec['Fl32_Log_Shared_Enum_Log_Level$'];
    /** @type {typeof Fl32_Log_Shared_Enum_Log_Type} */
    const TYPE = spec['Fl32_Log_Shared_Enum_Log_Type$'];
    /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
    const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];

    // WORKING VARS
    const template = `
<tr class="">
    <td class="">{{date}}</td>
    <td class="">
        <q-avatar size="xs" :color="iconLevelColor">{{iconLevelLetter}}</q-avatar>
    </td>
    <td class="">
        <q-avatar size="xs" :color="iconTypeColor">{{iconTypeLetter}}</q-avatar>
    </td>
    <td class="" style="height:20px; overflow: hidden;">{{item?.instance}}</td>
    <td class="">{{item?.source}}</td>
    <td class="" style="height:20px; overflow: hidden;">{{item?.message}}</td>
</tr>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl32_Log_Server_Front_Ui_Route_Home_A_Item
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        props: {
            /** @type {Fl32_Log_Shared_Dto_Log.Dto} */
            item: null,
        },
        computed: {
            date() {
                /** @type {Fl32_Log_Shared_Dto_Log.Dto} */
                const item = this?.item;
                const date = castDate(item?.date);
                return (date) ? formatDateTimeForLog(date) : 'n/a';
            },
            logType() {
                return this?.item?.type;
            },
            isError() {
                return (this?.item?.level === LEVEL.ERROR);
            },
            iconLevelColor() {
                return (this.isError) ? 'red-2' : 'blue-2';
            },
            iconLevelLetter() {
                return (this.isError) ? 'E' : 'I';
            },
            iconTypeColor() {
                return (this.logType === TYPE.FRONT) ? 'red-2'
                    : (this.logType === TYPE.BACK) ? 'blue-2'
                        : 'grey-2';
            },
            iconTypeLetter() {
                return (this.logType === TYPE.FRONT) ? 'F'
                    : (this.logType === TYPE.BACK) ? 'B'
                        : '?';
            }
        },
        methods: {
            openDetails() {
                console.log(`Click!!`);
            }
        },
    };
}
