import { promises as fs } from "fs";
import { nodeCache } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import yaml from "js-yaml";
import moment from "moment";

const fullPath =
  "../../../../../packages/sidebar2020/lib/server/blog/contents/";

Meteor.startup(async () => {
  try {
    let posts = [];

    const fileNames = await fs.readdir(fullPath);
    for (const fileName of fileNames) {
      const data = await fs.readFile(fullPath + fileName, "utf8");
      const [empty, frontmatterString, body] = data.split("---");
      const frontmatter = yaml.safeLoad(frontmatterString, "utf8");
      const user = Users.findOne({
        twitterScreenName: frontmatter.twitterScreenName,
      });
      const mPostedAt = moment(frontmatter.postedAt, "MM/DD/YY");
      posts.push({
        ...frontmatter,
        postedAt: mPostedAt.toDate(),
        postedAtFormatted: mPostedAt.format("MM/DD/YY"),
        userId: user._id,
        body,
      });
    }
    nodeCache.set("blogPosts", posts);
  } catch (err) {
    console.log(err);
  }
});
