import Posts from "../../modules/posts/collection";
import { Connectors } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";

const apiSchema = {
  posts: {
    typeName: "[Post]",
    resolver: async (webringSite, args, context) => {
      const documents = await Connectors.find(
        Posts,
        {
          webringSiteId: webringSite._id,
        },
        { sort: { postedAt: -1 }, limit: 3 }
      );
      const documentsRestricted = Users.restrictDocuments({
        user: context.currentUser,
        collection: Posts,
        documents,
      });
      return documentsRestricted;
    },
  },
};

export default apiSchema;
