import { WebApp } from "meteor/webapp";
import requestIp from "request-ip";
import Logs from "../modules/logs/collection.js";
import { getSetting } from "meteor/vulcan:core";
import bodyParser from "body-parser";

const app = WebApp.connectHandlers;

const enableRequestLogs = getSetting("enableRequestLogs");

app.use(requestIp.mw());

app.use(bodyParser.json());

app.use(function middleware1(req, res, next) {
  if (enableRequestLogs) {
    const {
      headers,
      httpVersion,
      method,
      socket,
      url,
      originalUrl,
      query,
      body,
    } = req;
    const { remoteAddress, remoteFamily } = socket;

    const data = {
      ip: req.clientIp,
      createdAt: new Date(),
      referrer: req.header("Referer"),
      method,
      originalUrl,
      // version: req.get("X-ClientVersion"),
      // platformVersion: req.get("X-ClientPlatformVersion"),
      // device: req.get("X-ClientDevice"),
      // locale: req.get("X-ClientLocale"),
      headers,
      // httpVersion,
      remoteAddress,
      query,
      // remoteFamily,
      url,
      body,
    };

    Logs.insert(data);
  }

  next();
});
