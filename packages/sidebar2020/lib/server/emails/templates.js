import VulcanEmail from 'meteor/vulcan:email';

VulcanEmail.addTemplates({
  wrapper:                  Assets.getText("lib/server/emails/common/wrapper2.handlebars"),
  postApproved:             Assets.getText("lib/server/emails/posts/postApproved2.handlebars"),
  newsletter:               Assets.getText("lib/server/emails/newsletter/newsletter2.handlebars"),
  sponsoredPaid:            Assets.getText("lib/server/emails/sponsored/sponsoredPaid2.handlebars"),
  webringSiteApproved:      Assets.getText("lib/server/emails/webring/webringSiteApproved.handlebars"),
});