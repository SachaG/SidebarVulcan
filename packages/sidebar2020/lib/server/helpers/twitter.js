import Twitter from "twitter";
import { getSetting } from "meteor/vulcan:core";

const twitterClient = new Twitter({
  consumer_key: getSetting("twitter.apiKey"),
  consumer_secret: getSetting("twitter.apiSecret"),
  access_token_key: getSetting("twitter.token"),
  access_token_secret: getSetting("twitter.tokenSecret"),
});

export const getTwitterData = async (screen_name) => {
  const params = { screen_name };
  try {
    const result = await twitterClient.get("users/show", params);
    const twitterAvatarUrl = result.profile_image_url_https.replace(
      "_normal",
      ""
    );
    const twitterName = result.name;
    return { twitterAvatarUrl, twitterName };
  } catch (error) {
    console.log("// getTwitterData error");
    console.log(`screen_name: ${screen_name}`);
    console.log(error);
    return;
  }
};

export const createTweet = async (contents) => {
  try {
    await twitterClient.post("statuses/update", {
      status: contents,
    });
  } catch (error) {
    console.log("// createTweet error");
    console.log(error);
    return;
  }
};
