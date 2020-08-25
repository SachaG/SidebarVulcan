import { runGraphQL, webAppConnectHandlersUse } from "meteor/vulcan:core";
import express from "express";
import get from "lodash/get";
import { postStatus } from "../../modules/data";

const query = `
query apiPostsQuery($input: MultiPostInput) {
  posts(input: $input) {
    results {
      # posts
      _id
      title
      url
      credit
      domain
      postedAt
      htmlBody
      isSponsored
      
      # categories
      categories {
        ...CategoryFragment
      }
    }
  }
}
`;

export const getJSON = async (input) => {
  const results = await runGraphQL(query, { input }, {}, { useCache: true, key: 'api' });
  const posts = get(results, "data.posts.results", []);

  const apiItems = posts.map((post) => {
    const { title, url, credit, postedAt, _id, htmlBody, domain } = post;
    const item = {
      title,
      author: credit,
      twitterName: credit,
      date: postedAt,
      url,
      guid: _id,
      body: htmlBody,
      domain,
    };
    return item;
  });

  return JSON.stringify(apiItems);
};

const app = express();

app.get("/api/:limit?", async function (req, res) {
  let { limit = 20 } = req.params;
  if (limit > 200) {
    limit = 200;
  }
  const input = {
    filter: { status: { _eq: postStatus.published } },
    sort: { postedAt: "desc" },
    limit,
  };
  res.status(200).send(await getJSON(input));
});

webAppConnectHandlersUse(Meteor.bindEnvironment(app), {
  name: "inquiries_endpoint",
  order: 200,
});
