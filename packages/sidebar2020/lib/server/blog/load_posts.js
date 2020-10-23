import { promises as fs } from "fs";
import { nodeCache, Utils, getSetting } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import yaml from "js-yaml";
import moment from "moment";

const fullPath = getSetting("blog.contentPath");

export const loadPosts = async () => {
  try {
    let posts = [];
    const fileNames = await fs.readdir(fullPath);
    for (const fileName of fileNames) {
      const data = await fs.readFile(fullPath + fileName, "utf8");
      const [empty, frontmatterString, body] = data.split("---");
      const frontmatter = yaml.safeLoad(frontmatterString, "utf8");
      const { twitterScreenName, slug, image, postedAt } = frontmatter;
      const user = Users.findOne({
        twitterScreenName,
      });
      if (user) {
        const mPostedAt = moment(postedAt, "MM/DD/YYYY");
        const pagePath = `/blog/${slug}`;
        posts.push({
          ...frontmatter,
          postedAt: mPostedAt.toDate(),
          postedAtFormatted: mPostedAt.format("MMMM Do, YYYY"),
          userId: user._id,
          user,
          pagePath,
          pageUrl: `${Utils.getSiteUrl()}${pagePath}`,
          body,
          image,
        });
    }
    }

    // sort posts by postedAt desc
    posts = posts.sort((p1, p2) => p1.postedAt > p2.postedAt);
    nodeCache.set("blogPosts", posts);
    return posts;
  } catch (err) {
    console.log(err);
  }
}

Meteor.startup(async () => {
  await loadPosts();
});
