import React from "react";
import { runGraphQL, webAppConnectHandlersUse } from "meteor/vulcan:core";
import express from "express";
import random from "lodash/random";
import sample from "lodash/sample";
import get from "lodash/get";
import ReactDOMServer from "react-dom/server";
import WebringBanner from "../../components/webring/WebringBanner";
import { webringStatus } from "../../modules/data.js";
import bodyParser from "body-parser";

const query = `
query webringSitesQuery($input: MultiWebringSiteInput) {
  webringSites(input: $input) {
    results {
      ...WebringSiteFragment
    }
  }
}
`;

export const getSVG = async (code, color) => {
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
  const currentSite = sites[currentSiteIndex];

  if (currentSiteIndex === -1) {
    throw new Error(`Could not find site for code "${code}"`);
  }

  const prevSiteIndex =
    currentSiteIndex === 0 ? totalSites - 1 : currentSiteIndex - 1;
  const nextSiteIndex =
    currentSiteIndex === totalSites - 1 ? 0 : currentSiteIndex + 1;
  // note: exclude current site from random pick
  const randomSiteIndex = sample([
    Math.max(0, random(0, currentSiteIndex - 1)),
    Math.min(totalSites - 1, random(currentSiteIndex + 1, totalSites - 1)),
  ]);

  const properties = {
    color,
    currentSiteIndex,
    prevSiteIndex,
    nextSiteIndex,
    randomSiteIndex,
    webringHomeUrl: "https://sidebar.io/webring",
    code,
    currentSite,
    previousSite: sites[prevSiteIndex],
    nextSite: sites[nextSiteIndex],
    randomSite: sites[randomSiteIndex],
  };
  // console.log(properties);

  const svg = ReactDOMServer.renderToStaticMarkup(
    <WebringBanner {...properties} />
  );
  return svg;
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/static", express.static("public"));

app.get("/webring/banner/:code.svg", async function (req, res) {
  const { code } = req.params;
  const { color } = req.query;
  try {
    const svg = await getSVG(code, color);
    res.header("Content-Type", "image/svg+xml");
    res.status(200).send(svg);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

webAppConnectHandlersUse(Meteor.bindEnvironment(app), {
  name: "webringbanner_endpoint",
  order: 300,
});
