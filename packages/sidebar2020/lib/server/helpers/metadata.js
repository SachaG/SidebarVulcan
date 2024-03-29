// import got from "got";
import fetch from "node-fetch";

const twitterScraper = () => {
  const rules = {
    twitter: [
      // They receive as parameter:
      // - `htmlDom`: the cheerio HTML instance.
      // - `url`: The input URL used for extact the content.
      ({ htmlDom: $, url }) => $('meta[name="twitter:site"]').attr("content"),
    ],
  };
  return rules;
};

const metascraper = require("metascraper")([
  require("metascraper-author")(),
  // require('metascraper-date')(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  // require('metascraper-logo')(),
  // require('metascraper-clearbit')(),
  require("metascraper-publisher")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
  twitterScraper(),
]);

export const getMetadata = async (targetUrl) => {
  // const { body: html, url } = await got(targetUrl);
  const response = await fetch(targetUrl);
  const html = await response.text();

  const metadata = await metascraper({ html, url: targetUrl });
  return metadata;
};
