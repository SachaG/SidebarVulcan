/*

The Newsletters collection

*/

import {
  extendCollection,
  createCollection,
  createSchema,
} from "meteor/vulcan:core";
import { schema } from "./schema.js";

// import Newsletters from "meteor/vulcan:newsletter";

/**
 * @summary The global namespace for Categories.
 * @namespace Newsletters
 */

// Newsletters.attachSchema(createSchema(schema));

// extendCollection(Newsletters, {
//   schema
// });

const Newsletters = createCollection({

  collectionName: 'Newsletters',

  typeName: 'Newsletter',

  schema,

});

export default Newsletters;
