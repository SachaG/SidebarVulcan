import {
  addGraphQLSchema,
  addGraphQLMutation,
  addGraphQLResolvers,
  updateMutator,
  runGraphQL,
  Connectors,
} from "meteor/vulcan:core";
import VulcanEmail from "meteor/vulcan:email";
import Users from "meteor/vulcan:users";
import Posts from "../../../modules/posts/collection";
import { postStatus, userStatus } from "../../../modules/data";
import get from "lodash/get";
import { getMetadata } from "../../helpers/metadata.js";

// import metascraper from 'metascraper';

const urlMetadataType = `
type UrlMetadata {
  author: String
  description: String
  image: String
  publisher: String
  title: String
  url: String
  twitter: String
}`;

const getUrlMetadata = async (root, { url }, context) => {
  return await getMetadata(url);
};
addGraphQLSchema(urlMetadataType);
addGraphQLMutation(`getUrlMetadata(url: String): UrlMetadata`);
addGraphQLResolvers({ Mutation: { getUrlMetadata } });

const postQuery = `
  query PostsSingleQuery($input: SinglePostInput!){
    post(input: $input){
      result{
        user{
          _id
          email
        }
      }
    }
  }
`;

const approvePost = async (root, { documentId }, context) => {
  const variables = { input: { id: documentId } };
  const post = await runGraphQL(postQuery, variables);
  const { currentUser } = context;
  if (Users.isAdmin(currentUser)) {
    const result = await updateMutator({
      collection: Posts,
      documentId,
      data: { status: postStatus.published, postedAt: new Date() },
      validate: true,
      context,
    });
    const to = get(post, "user.email");
    if (to) {
      const email = {
        to,
        emailName: "postApproved",
        variables,
      };
      await VulcanEmail.buildAndSend(email);
    }
    return { ...post, ...result.data };
  } else {
    throw new Error("Sorry, you are not allowed to perform this action");
  }
};

addGraphQLMutation(`approvePost(documentId: String): Post`);
addGraphQLResolvers({ Mutation: { approvePost } });

const spamPost = async (root, { documentId }, context) => {
  const variables = { input: { id: documentId } };
  const result = await runGraphQL(postQuery, variables);
  const post = get(result, 'data.post.result', {});
  const user = post.user;

  const { currentUser } = context;
  if (Users.isAdmin(currentUser)) {
    // mark user as spammer
    await updateMutator({
      collection: Users,
      documentId: user._id,
      data: { isSpammer: true },
      validate: true,
      context,
    });
    // mark post as spam
    // const result = await updateMutator({
    //   collection: Posts,
    //   documentId,
    //   data: { status: postStatus.spam },
    //   validate: true,
    //   context,
    // });
    // mark all of that user's pending posts as spam
    await Connectors.update(
      Posts,
      { userId: user._id, status: postStatus.pending },
      { $set: { status: postStatus.spam } },
      { multi: true }
    );
    return { ...post, status: postStatus.spam };
  } else {
    throw new Error("Sorry, you are not allowed to perform this action");
  }
};

addGraphQLMutation(`spamPost(documentId: String): Post`);
addGraphQLResolvers({ Mutation: { spamPost } });
