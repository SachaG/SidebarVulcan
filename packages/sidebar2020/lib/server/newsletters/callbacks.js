import VulcanEmail from "meteor/vulcan:email";

export const generateNewsletter = async (document) => {
  const { postsIds, message } = document;
  const email = await VulcanEmail.build({
    emailName: "newsletter",
    variables: { postsIds, message },
  });
  const { html, data, subject } = email;
  document = { ...document, html, data, subject };
  return document;
};