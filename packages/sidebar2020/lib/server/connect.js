import { WebApp } from "meteor/webapp";
import requestIp from "request-ip";
import Logs from '../modules/logs/collection.js';

const app = WebApp.connectHandlers;

app.use(requestIp.mw());

app.use(function middleware1(req, res, next) {
  const { headers, httpVersion, method, socket, url, originalUrl, query } = req;
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
  };

  Logs.insert(data);

  next();
});
