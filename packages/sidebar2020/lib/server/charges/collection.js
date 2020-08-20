import { extendCollection } from "meteor/vulcan:core";
import { Charges } from "meteor/vulcan:payments";
import { apiSchema } from "./apischema.js";

extendCollection(Charges, {
  apiSchema,
});
