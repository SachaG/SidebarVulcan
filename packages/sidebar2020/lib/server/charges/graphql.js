import { addGraphQLSchema, addGraphQLResolvers } from "meteor/vulcan:core";

// see https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/

const associatedDocumentUnion = `union AssociatedDocument = Job | Post`;
const __resolveType = (obj) => {
  let type;
  if (obj.company) {
    type = "Job";
  } else if (obj.title) {
    type = "Post";
  } else {
    type = null;
  }
  return type;
};

addGraphQLSchema(associatedDocumentUnion);
addGraphQLResolvers({ AssociatedDocument: { __resolveType } });
