import Posts from "../../modules/posts/collection";
import { postStatus } from "../../modules/data";

export const checkForScheduledPosts = async () => {
  console.log("// checkForScheduledPosts");
  const selector = {
    status: postStatus.scheduled,
    scheduledAt: { $lte: new Date() },
  };
  const posts = Posts.find(selector).fetch();
  const updated = Posts.update(
    selector,
    { $set: { postedAt: new Date(), status: postStatus.published } },
    { multi: true }
  );

  console.log(
    updated > 0
      ? `-> Published ${updated} scheduled post at ${new Date()} (${posts
          .map((p) => p.title)
          .join(", ")})`
      : `-> No scheduled posts to publish`
  );
};
