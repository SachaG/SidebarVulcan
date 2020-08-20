import { addToFragmentMatcher } from "meteor/vulcan:core";

addToFragmentMatcher({
  kind: "UNION",
  name: "AssociatedDocument",
  possibleTypes: [{ name: "Post" }, { name: "Job" }],
});
