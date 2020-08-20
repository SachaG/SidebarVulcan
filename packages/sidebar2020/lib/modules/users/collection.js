import { extendCollection } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import { schema } from "./schema";

extendCollection(Users, {
  schema,
});
