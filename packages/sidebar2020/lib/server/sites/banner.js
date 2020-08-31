import React from "react";
import { runGraphQL, webAppConnectHandlersUse } from "meteor/vulcan:core";
import express from "express";
import random from "lodash/random";
import sample from "lodash/sample";
import get from "lodash/get";
import ReactDOMServer from "react-dom/server";
import WebringBanner from "../../components/webring/WebringBanner";
import { webringStatus } from "../../modules/data.js";

const query = `
query webringSitesQuery($input: MultiWebringSiteInput) {
  webringSites(input: $input) {
    results {
      ...WebringSiteFragment
    }
  }
}
`;

export const getSVG = async (code) => {
  const input = {
    filter: { status: { _eq: webringStatus.approved } },
    sort: { createdAt: "desc" },
  };

  const results = await runGraphQL(
    query,
    { input },
    {},
    { useCache: true, key: "webring_banner" }
  );

  let sites = get(results, "data.webringSites.results", []);

  sites = sites.map((s) => {
    s.webringUrl = s.url + `?ref=sidebar_webring`;
    return s;
  });

  const totalSites = sites.length;
  const currentSiteIndex = sites.findIndex((s) => s.code === code);

  const prevSiteIndex =
    currentSiteIndex === 0 ? totalSites : currentSiteIndex - 1;
  const nextSiteIndex =
    currentSiteIndex === totalSites ? 0 : currentSiteIndex + 1;
  // note: exclude current site from random pick
  const randomSiteIndex = sample([random(0, currentSiteIndex - 1), random(currentSiteIndex + 1, totalSites)]);
  const properties = {
    webringHomeUrl: "https://sidebar.io/webring",
    code,
    currentSite: sites[currentSiteIndex],
    previousSite: sites[prevSiteIndex],
    nextSite: sites[nextSiteIndex],
    randomSite: sites[randomSiteIndex],
  };
  console.log(properties)

  const svg = ReactDOMServer.renderToStaticMarkup(
    <WebringBanner {...properties} />
  );
  return svg;
};

const app = express();

app.use('/static', express.static('public'))

app.get("/webring/banner/:code.svg", async function (req, res) {
  let { code } = req.params;
  const svg = await getSVG(code);
  console.log(svg)

  res.header('Content-Type', 'image/svg+xml');
  res.status(200).send(svg);
});

webAppConnectHandlersUse(Meteor.bindEnvironment(app), {
  name: "webringbanner_endpoint",
  order: 300,
});
