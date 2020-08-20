import { getSetting } from "meteor/vulcan:core";
import VulcanEmail from "meteor/vulcan:email";
import moment from "moment";
import get from "lodash/get";
import Posts from "../../modules/posts/collection";
import Newsletters from "../../modules/newsletters/collection";
import { postStatus } from "../../modules/data";

const defaultEmail = getSetting("defaultEmail");

const postsQuery = /* GraphQL */ `
  query PostsSingleQuery($input: SinglePostInput!) {
    siteData {
      title
      url
    }
    post(input: $input) {
      result {
        title
        url
        htmlBody

        scheduledAtFormatted
        paidAtFormatted
        sponsorshipPriceFormatted

        user {
          pageUrl
          displayName
        }
      }
    }
  }
`;

/*

Note: this query is used to generate the newsletter contents on newsletter creation, 
so it can't rely on calling the `newsletter` resolver with a newsletter id since the 
newsletter doesn't exist yet at that time. 

*/
const newsletterQuery = /* GraphQL */ `
  query NewsletterQuery($postsIds: [String!]) {
    siteData {
      title
    }
    posts(input: { filter: { _id: { _in: $postsIds } } }) {
      results {
        title
        shortTitle
        url
        urlRedirect
        domain
        htmlBody
        # cloudinaryUrl(format: "smallish")
        postedAtFormatted
        isSponsored

        credit
        twitterAvatarUrl
        twitterName

        emailShareUrl
        twitterShareUrl
        facebookShareUrl

        categories {
          name
          pageUrl
        }
        user {
          avatarUrl
          pageUrl
          displayName
          email
        }
      }
    }
    # newsletter(input: { id: $newsletterId }){
    #   result {
    #     _id
    #     subject
    #     createdAt
    #     sentAt
    #     message

    #     posts {
    #       title
    #       shortTitle
    #       url
    #       linkUrl
    #       domain
    #       htmlBody
    #       # cloudinaryUrl(format: "smallish")
    #       postedAtFormatted
    #       sponsored

    #       emailShareUrl
    #       twitterShareUrl
    #       facebookShareUrl

    #       categories{
    #         name
    #       }

    #       user{
    #         avatarUrl
    #         pageUrl
    #         displayName
    #       }
    #     }
    #     # title
    #     # shortTitle
    #     # url
    #     # linkUrl
    #     # domain
    #     # htmlBody
    #     # cloudinaryUrl(format: "smallish")
    #     # postedAtFormatted
    #     # sponsored

    #     # emailShareUrl
    #     # twitterShareUrl
    #     # facebookShareUrl

    #     # categories{
    #     #   name
    #     # }

    #     # user{
    #     #   avatarUrl
    #     #   pageUrl
    #     #   displayName
    #     # }
    #   }
    # }
    # job( sort: { publishedAt: desc }){
    #   company
    #   url
    #   title
    #   htmlBody
    #   cloudinaryUrl(format: "smallish")
    # }
  }
`;
VulcanEmail.addEmails({
  postApproved: {
    template: "postApproved",
    testPath: "/email/post-approved/:postId?",
    to(data) {
      return get(data, "data.post.result.user.email", defaultEmail);
    },
    subject(data) {
      const dummyPost = { title: "[title]", user: { displayName: "[user]" } };
      const post = get(data, "data.post.result", dummyPost);
      return "Your link “" + post.title + "” has been approved";
    },
    query: postsQuery,
    testVariables({ postId }) {
      if (!postId) {
        postId = Posts.findOne(
          {
            status: postStatus.published,
          },
          { sort: { postedAt: -1 } }
        )._id;
      }
      return { input: { id: postId } };
    },
  },

  sponsoredPaid: {
    template: "sponsoredPaid",
    testPath: "/email/sponsored-paid/:postId?",
    to(data) {
      return get(data, "data.post.result.user.email", defaultEmail);
    },
    subject: "Thanks for submitting a sponsored link",
    query: postsQuery,
    testVariables({ postId }) {
      if (!postId) {
        postId = Posts.findOne(
          {
            status: postStatus.published,
            paidAt: { $exists: true },
          },
          { sort: { postedAt: -1 } }
        )._id;
      }
      return { input: { id: postId } };
    },
  },

  newsletter: {
    template: "newsletter",
    testPath: "/email/newsletter/:newsletterId?/:message?",
    subject(data) {
      const posts = get(data, "data.posts.results", []);
      const subject =
        posts.length > 0
          ? posts.map((p) => p.shortTitle).join(", ")
          : "[subject]";
      return subject;
    },
    data({ variables = {} }) {
      const { message } = variables;
      return {
        message,
        date: moment().format("MMMM D YYYY"),
      };
    },
    query: newsletterQuery,
    // isValid(data) {
    //   return data.PostsNewsletter && data.PostsNewsletter.length;
    // },
    testVariables({ newsletterId, message }) {
      const newsletter = newsletterId
        ? Newsletters.findOne(newsletterId)
        : Newsletters.findOne({}, { createdAt: -1 });
      const postsIds = newsletter.postsIds;
      return { postsIds, message };
    },
  },
});
