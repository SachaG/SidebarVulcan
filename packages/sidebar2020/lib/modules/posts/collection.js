/*

Posts collection

*/

import { schema, apiSchema } from "./schema.js";
import { createCollection } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import { postStatus } from "../data";
import PostCell from "../../components/posts/PostCell";

// user can view post if it's published, or they are its owner; or they are admin
const canRead = ({ document, user }) => {
  return (
    document.status === postStatus.published ||
    Users.owns(user, document) ||
    Users.isAdmin(user)
  );
};

const Posts = createCollection({
  collectionName: "Posts",

  typeName: "Post",

  schema,

  apiSchema,

  permissions: {
    read: canRead,
    canCreate: ["members"],
    canUpdate: ["owners"],
    canDelete: ["owners"],
  },

  cell: PostCell,

  // defaultInput: {
  //   filter: {
  //     status: {
  //       _eq: postStatus.published,
  //     },
  //   },
  // },
});

export default Posts;
