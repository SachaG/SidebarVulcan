/*

The Categories collection

*/

import { createCollection } from "meteor/vulcan:core";
import { schema, apiSchema } from "./schema.js";

/**
 * @summary The global namespace for Categories.
 * @namespace Categories
 */
export const Categories = createCollection({
  collectionName: "Categories",

  typeName: "Category",

  schema,

  apiSchema,

  getLabel: (category) => category.name,
});

export default Categories;
