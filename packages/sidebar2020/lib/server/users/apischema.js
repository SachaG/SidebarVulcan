import get from "lodash/get";
import WebringSites from "../../modules/sites/collection.js";

export const apiSchema = {
  twitterName: {
    typeName: "String",
    resolver: (user) => {
      return get(user, "services.twitter.screenName");
    },
  },

  webringSites: {
    typeName: "[WebringSite]",
    resolver: (user, args, context) => {
      const sites = WebringSites.find({ userId: user._id }).fetch();
      return context.Users.restrictViewableFields(
        context.currentUser,
        WebringSites,
        sites
      );
    },
  },
};
