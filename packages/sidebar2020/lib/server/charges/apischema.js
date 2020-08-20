import Posts from "../../modules/posts/collection";
import Jobs from "../../modules/jobs/collection";
import { Connectors } from "meteor/vulcan:core";

export const apiSchema = {
  associatedDocument: {
    typeName: "AssociatedDocument",
    resolver: (charge) => {
      const { associatedCollection, associatedId } = charge;
      let collection;
      switch (associatedCollection) {
        case "posts":
          collection = Posts;
          break;
        case "jobs":
          collection = Jobs;
          break;
        default:
          return null;
      }
      const document = Connectors.get(collection, { _id: associatedId });
      return document;
    },
  },
};
