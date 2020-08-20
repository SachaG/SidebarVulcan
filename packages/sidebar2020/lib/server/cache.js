import {
  addGlobalCallbacks,
  invalidateCache,
  nodeCache,
  webAppConnectHandlersUse,
} from "meteor/vulcan:core";
import express from "express";

export const invalidateCacheCallback = () => {
  invalidateCache();
};

addGlobalCallbacks({
  create: {
    async: [invalidateCacheCallback],
  },
  update: {
    async: [invalidateCacheCallback],
  },
  delete: {
    async: [invalidateCacheCallback],
  },
});

const app = express();

app.get("/cache", async function (req, res) {
  const keys = nodeCache.keys().join(',');
  const stats = JSON.stringify(nodeCache.getStats(), "", 2);
  res.status(200).send(`<div>${keys}</div><div>${stats}</div>`);
});

webAppConnectHandlersUse(Meteor.bindEnvironment(app), {
  name: "cache_endpoint",
  order: 200,
});
