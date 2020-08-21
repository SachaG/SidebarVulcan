/*

The Logs collection

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Logs.
 * @namespace Logs
 */
const Logs = createCollection({

  collectionName: 'Logs',

  typeName: 'Log',

  schema,

  mutations: null,

});

export default Logs;