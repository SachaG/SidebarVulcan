/*

The Jobs collection

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Categories.
 * @namespace Jobs
 */
const Jobs = createCollection({

  collectionName: 'Jobs',

  typeName: 'Job',

  schema,

});

export default Jobs;