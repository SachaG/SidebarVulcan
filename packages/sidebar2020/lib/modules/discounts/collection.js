import { createCollection } from "meteor/vulcan:core";
import schema from "./schema.js";

/**
 * @summary The global namespace for Discounts.
 * @namespace Discounts
 */
const Discounts = createCollection({
  collectionName: "Discounts",

  typeName: "Discount",

  schema,

  permissions: {
    canRead: ["admins"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canDelete: ["admins"],
  },
  
});

export default Discounts;
