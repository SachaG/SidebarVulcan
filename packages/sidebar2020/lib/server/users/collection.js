import { extendCollection } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";

import { apiSchema } from "./apischema.js";

extendCollection(Users, {
  apiSchema,
});
