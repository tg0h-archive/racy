import {_ticketCache} from "./_ticket.cache.mjs";

// exporting an instance from a module is *mostly* enough to create a singleton
// since node will cache the module and not execute the new ticketCache() at every import
export const ticketCache = new _ticketCache();
