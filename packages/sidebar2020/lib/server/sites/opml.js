import { Connectors, webAppConnectHandlersUse } from "meteor/vulcan:core";
import express from "express";
import WebringSites from "../../modules/sites/collection.js";
import { webringStatus } from "../../modules/data.js";

const app = express();

const getOpml = (sites) => `<opml version="2.0">
<body>
  <outline text="Sidebar Webring Feeds" title="Sidebar Webring Feeds">
    ${sites.map((site) => `<outline xmlUrl='${site.feedUrl}' />`).join('\n')}
  </outline>
</body>
</opml>
`;

app.get("/webring/opml", async function (req, res) {
  try {
    const sites = await Connectors.find(WebringSites, {
      status: webringStatus.approved,
    });
    const contents = getOpml(sites);
    res.set("Content-Disposition", "attachment;filename=sidebar.xml");
    res.header("Content-Type", "text/xml;charset=UTF-8");
    res.status(200).send(contents);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

webAppConnectHandlersUse(Meteor.bindEnvironment(app), {
  name: "webringopml_endpoint",
  order: 301,
});
