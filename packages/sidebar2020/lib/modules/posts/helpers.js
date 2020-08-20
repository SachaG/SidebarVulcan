import { getSetting, Utils } from "meteor/vulcan:core";
import { postStatus, basePostPrice } from "../data.js";
import Users from "meteor/vulcan:users";

export const getPostPageLink = (post, isAbsolute = false) =>
  `${isAbsolute ? "https://sidebar.io" : ""}/post/${post._id}`;

export const getPostLink = (post, isRedirected = true) =>
  isRedirected ? getOutgoingUrl(post.url) : post.url;

export const getTwitterShareUrl = (post) => {
  const via = getSetting("twitterAccount", null)
    ? `&via=${getSetting("twitterAccount")}`
    : "";
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    post.title
  )}%20${encodeURIComponent(getPostLink(post, true))}${via}`;
};

export const getFacebookShareUrl = (post) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    getPostLink(post, true)
  )}`;
};

export const getEmailShareUrl = (post) => {
  const subject = `Interesting link: ${post.title}`;
  const body = `I thought you might find this interesting:

${post.title}
${getPostLink(post, false)}

(found via ${getSetting("siteUrl")})
  `;
  return `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

export const addAtSymbol = (s) => s && (s.charAt(0) === "@" ? s : "@" + s);

export const removeAtSymbol = (s) => s && s.replace("@", "");

export const getOutgoingUrl = (url) =>
  Utils.getSiteUrl() + "out?url=" + encodeURIComponent(`${url}?ref=sidebar`);

export const getDefaultStatus = (post, user) => {
  if (Users.isAdmin(user)) {
    if (post.status) {
      return document.status;
    } else if (post.scheduledAt) {
      return postStatus.scheduled;
    } else {
      return postStatus.published;
    }
  } else {
    if (user.isSpammer) {
      return postStatus.spam;
    } else {
      return postStatus.pending;
    }
  }
};

export const getPostSponsorshipPrice = (discountAmount = 0) =>
  (basePostPrice * (100 - discountAmount)) / 100;
