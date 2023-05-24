/**
 * Convert the log related structures on the back (Shared, RDB, ...).
 */
export default class Fl32_Log_Server_Back_Convert_Log {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {Fl32_Log_Server_Back_RDb_Schema_Log} */
        const rdb = spec['Fl32_Log_Server_Back_RDb_Schema_Log$'];
        /** @type {Fl32_Log_Shared_Dto_Log} */
        const shared = spec['Fl32_Log_Shared_Dto_Log$'];
        /** @type {typeof Fl32_Log_Shared_Enum_Log_Level} */
        const LEVEL = spec['Fl32_Log_Shared_Enum_Log_Level$'];
        /** @type {typeof Fl32_Log_Shared_Enum_Log_Type} */
        const TYPE = spec['Fl32_Log_Shared_Enum_Log_Type$'];

        // FUNCS

        /**
         * Convert string level to numeric.
         * @param {string} data
         * @return {number}
         */
        function levelToNum(data) {
            if (data === LEVEL.INFO) return 1;
            else return 0;
        }

        /**
         * Convert numeric level to string.
         * @param {number} data
         * @return {string}
         */
        function levelToStr(data) {
            if (data === 1) return LEVEL.INFO;
            else return LEVEL.ERROR;
        }

        /**
         * Convert string type to numeric.
         * @param {string} data
         * @return {number}
         */
        function typeToNum(data) {
            if (data === TYPE.FRONT) return 1;
            else return 0;
        }

        /**
         * Convert numeric type to string.
         * @param {number} data
         * @return {string}
         */
        function typeToStr(data) {
            if (data === 1) return TYPE.FRONT;
            else return TYPE.BACK;
        }

        // INSTANCE METHODS

        /**
         * @param {Fl32_Log_Server_Back_RDb_Schema_Log.Dto} data
         * @returns {Fl32_Log_Shared_Dto_Log.Dto}
         */
        this.rdb2share = function (data) {
            const res = shared.createDto();
            res.bid = castInt(data?.bid);
            res.date = castDate(data?.date);
            res.instance = castString(data?.instance);
            res.level = levelToStr(data?.level);
            res.message = castString(data?.message);
            res.meta = structuredClone(data?.meta);
            res.source = castString(data?.source);
            res.type = typeToStr(data?.type);
            return res;
        };

        /**
         * @param {Fl32_Log_Shared_Dto_Log.Dto} data
         * @returns {Fl32_Log_Server_Back_RDb_Schema_Log.Dto}
         */
        this.share2rdb = function (data) {
            const res = rdb.createDto();
            res.bid = castInt(data?.bid);
            res.date = castDate(data?.date);
            res.instance = castString(data?.instance);
            res.level = levelToNum(data?.level);
            res.message = castString(data?.message);
            res.meta = structuredClone(data?.meta);
            res.source = castString(data?.source);
            res.type = typeToNum(data?.type);
            return res;
        };

    }
}
