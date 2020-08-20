import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Categories.
 * @namespace Jobs
 */
const Discounts = createCollection({

  collectionName: 'Discounts',

  typeName: 'Discount',

  schema,

});

export default Discounts;