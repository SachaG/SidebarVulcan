import { Connectors } from "meteor/vulcan:core";
import Posts from "../../modules/posts/collection";

export const getSubject = (newsletter) => {
  const { postsIds } = newsletter;
  const posts = Connectors.find(Posts, { _id: { $in: postsIds } });
  const subject = posts
    .map((post, index) =>
      index > 0 ? `, ${post.shortTitle}` : post.shortTitle
    )
    .join("");
  return Utils.trimWords(subject, 15);
};
