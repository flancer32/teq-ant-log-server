/**
 *  Metadata for RDB entity: the log entity.
 *  @namespace Fl32_Log_Server_Back_RDb_Schema_Log
 */
// MODULE'S VARS
const NS = 'Fl32_Log_Server_Back_RDb_Schema_Log';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/log';

/**
 * @memberOf Fl32_Log_Server_Back_RDb_Schema_Log
 * @type {Object}
 */
const ATTR = {
    BID: 'bid',
    DATE: 'date',
    INSTANCE: 'instance',
    LEVEL: 'level',
    MESSAGE: 'message',
    META: 'meta',
    SOURCE: 'source',
    TYPE: 'type',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Fl32_Log_Server_Back_RDb_Schema_Log
 */
class Dto {
    static namespace = NS;
    /** @type {number} */
    bid;
    /**
     * Aggregation date.
     * @type {Date}
     */
    date;
    /**
     * UUID for instance of the log producer (session ID, backend ID, ...).
     * @type {string}
     */
    instance;
    /**
     * Code for log level (0 - error, 1 - info, ...).
     * @type {number}
     */
    level;
    /**
     * Log message.
     * @type {string}
     */
    message;
    /**
     * Some metadata.
     * @type {Object}
     */
    meta;
    /**
     * Namespace of the log source (filename, class, ...).
     * @type {string}
     */
    source;
    /**
     * Type of the log emitter (0 - back, 1 - front).
     * @type {number}
     */
    type;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Fl32_Log_Server_Back_RDb_Schema_Log {
    constructor(spec) {
        /** @type {Fl32_Log_Server_Back_Defaults} */
        const DEF = spec['Fl32_Log_Server_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Schema_EntityBase} */
        const base = spec['TeqFw_Db_Back_RDb_Schema_EntityBase$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {Fl32_Log_Server_Back_RDb_Schema_Log.Dto} [data]
         * @return {Fl32_Log_Server_Back_RDb_Schema_Log.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.bid = castInt(data?.bid);
            res.date = castDate(data?.date);
            res.instance = castString(data?.instance);
            res.level = castInt(data?.level);
            res.message = castString(data?.message);
            res.meta = castString(data?.meta);
            res.source = castString(data?.source);
            res.type = castInt(data?.type);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Fl32_Log_Server_Back_RDb_Schema_Log.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.BID],
            Dto
        );
    }
}