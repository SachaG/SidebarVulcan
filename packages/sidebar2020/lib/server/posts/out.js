import { Connectors, webAppConnectHandlersUse } from "meteor/vulcan:core";
import express from "express";
import { postStatus } from "../../modules/data";
import escapeStringRegexp from "escape-string-regexp";
import Posts from "../../modules/posts/collection";

const app = express();

app.get("/out", async function (req, res) {
  let { url } = req.query;

  if (url) {
    try {

      // disable URL check for now
      
      /*

      If the URL passed to ?url= is in plain text, any hash fragment
      will get stripped out.
      So we search for any post whose URL contains the current URL to get a match
      even without the hash
      
      */
      // const post = await Connectors.get(
      //   Posts,
      //   {
      //     status: postStatus.published,
      //     url: { $regex: escapeStringRegexp(url.replace("?ref=sidebar", "")) },
      //   },
      //   { sort: { postedAt: -1, createdAt: -1 } }
      // );

      if (true) {
        // const { _id, clickCount } = post;
        // const ip =
        //   (req.headers && req.headers["x-forwarded-for"]) ||
        //   req.connection.remoteAddress;

        // runCallbacksAsync('posts.click.async', post, ip);

        await Connectors.update(
          Posts,
          { url: url && url.replace("?ref=sidebar", "") },
          { $inc: { clickCount: 1 } }
        );

        res.writeHead(301, { Location: url });
        res.end();
      } else {
        // don't redirect if we can't find a post for that link
        res.send(`Invalid URL: ${url}`);
      }
    } catch (error) {
      console.log("// /out error");
      console.log(error);
      console.log(url);
    }
  } else {
    res.end("Please provide a URL");
  }
});

webAppConnectHandlersUse(Meteor.bindEnvironment(app), {
  name: "inquiries_endpoint",
  order: 250,
});
