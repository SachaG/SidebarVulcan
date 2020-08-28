import VulcanEmail from "meteor/vulcan:email";
import { webringStatus } from "../../modules/data";

export const sendSiteApprovedNotification = async ({
  oldDocument,
  document,
}) => {
  if (
    oldDocument.status === webringStatus.pending &&
    document.status === webringStatus.approved
  ) {
    await VulcanEmail.buildAndSend({
      emailName: "webringSiteApproved",
      variables: { input: { id: document._id } },
    });
  }
};
