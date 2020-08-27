import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for WebringSites.
 * @namespace WebringSites
 */
const WebringSites = createCollection({

  collectionName: 'WebringSites',

  typeName: 'WebringSite',

  schema,

  permissions: {
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners"],
    canDelete: ["owners"],
  },
  
});

export default WebringSites;