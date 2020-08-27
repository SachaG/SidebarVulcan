import SimpleSchema from "simpl-schema";
import get from "lodash/get";

export const schema = {
  isSpammer: {
    type: Boolean,
    optional: true,
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["admins"],
  },
  // hack to make email field required only in some cases (when this field is `true`)
  emailIsRequired: {
    type: Boolean,
    optional: true,
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    canRead: ["guests"],
    hidden: true,
    onCreate: () => null,
    onUpdate: () => null
  },
  email: {
    type: String,
    optional() {
      // console.log(this);
      // console.log(this.validationContext)
      // console.log(this.validationContext && this.validationContext.name)
      const emailIsRequired = get(this, 'obj.$set.emailIsRequired', false);
      return !emailIsRequired;
    },
    regEx: SimpleSchema.RegEx.Email,
    input: "text",
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    canRead: ["owners", "admins"],
    searchable: true,
  },
  twitterScreenName: {
    type: String,
    optional: true,
    input: "text",
    canRead: ["guests"],
    onCreate: ({ document }) => get(document, "services.twitter.screenName"),
  },
  twitterName: {
    type: String,
    optional: true,
    input: "text",
    canRead: ["guests"],
  },
};
