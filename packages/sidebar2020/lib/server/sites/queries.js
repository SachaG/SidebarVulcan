import {
  addGraphQLQuery,
  addGraphQLResolvers,
  runGraphQL,
} from "meteor/vulcan:core";
import { webringStatus } from "../../modules/data";

const webringQuery = `
query webringQuery($input: MultiWebringSiteInput) {
  webringSites(input: $input) {
    results {
      ...WebringSiteFullFragment
    }
    totalCount
  }
}
`;

const webring = async (root, args, context) => {
  const input = {
    limit: 999,
    filter: { status: { _eq: webringStatus.approved } },
    sort: { createdAt: "desc" },
    enableCache: true,
  };
  const results = await runGraphQL(
    webringQuery,
    { input },
    {},
    { useCache: true, key: "webring" }
  );
  const webringSites = results.data.webringSites;
  webringSites.results = webringSites.results.map((s) => {
    s.createdAt = new Date(s.createdAt);
    return s;
  });
  return webringSites.results;
};

addGraphQLQuery(`webring: [WebringSite]`);
addGraphQLResolvers({ Query: { webring } });
