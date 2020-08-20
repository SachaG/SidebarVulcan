import get from "lodash/get";

export const apiSchema = {
  twitterName: {
    typeName: "String",
    resolver: (user) => {
      return get(user, "services.twitter.screenName");
    },
  },
};
