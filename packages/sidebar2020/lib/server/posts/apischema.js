// import Posts from "../../modules/posts/collection";
import Newsletters from "../../modules/newsletters/collection";
import { Connectors } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import {
  getPostPageLink,
  getEmailShareUrl,
  getTwitterShareUrl,
  getFacebookShareUrl,
  getOutgoingUrl,
} from "../../modules/posts/helpers";
import { formatMoney } from "../../modules/helpers";

export const apiSchema = {
  newsletters: {
    typeName: "[Newsletter]",
    resolver: async (post, args, context) => {
      const documents = await Connectors.find(Newsletters, {
        postsIds: post._id,
      });
      const documentsRestricted = Users.restrictDocuments({
        user: context.currentUser,
        collection: Newsletters,
        documents,
      });
      return documentsRestricted;
    },
  },
  pagePath: {
    typeName: "String",
    resolver: (post) => {
      return getPostPageLink(post, false);
    },
  },
  
  pageUrl: {
    typeName: "String",
    resolver: (post) => {
      return getPostPageLink(post, true);
    },
  },

  urlRedirect: {
    typeName: "String",
    resolver: (post) => getOutgoingUrl(post.url)
  },

  emailShareUrl: {
    typeName: "String",
    resolver: (post) => {
      return getEmailShareUrl(post);
    },
  },

  twitterShareUrl: {
    typeName: "String",
    resolver: (post) => {
      return getTwitterShareUrl(post);
    },
  },

  facebookShareUrl: {
    typeName: "String",
    resolver: (post) => {
      return getFacebookShareUrl(post);
    },
  },

  sponsorshipPriceFormatted: {
    typeName: "String",
    resolver: ({ sponsorshipPrice }) => formatMoney(sponsorshipPrice/100),
  },
};
