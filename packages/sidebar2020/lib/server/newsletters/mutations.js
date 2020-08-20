// import Users from "meteor/vulcan:users";
// import {
//   addGraphQLMutation,
//   addGraphQLResolvers,
//   Utils,
//   Connectors,
// } from "meteor/vulcan:core";
// import { send, subscribeUser, subscribeEmail, unsubscribeUser } from 'meteor/vulcan:newsletter';
import { addNewsletterMutations } from "meteor/vulcan:newsletter";

addNewsletterMutations(); 

// const resolver = {
//   Mutation: newsletterMutations,
// };

// const resolver = {
//   Mutation: {
//     async sendNewsletter(root, args, context) {
//       if(context.currentUser && Users.isAdminById(context.currentUser._id)) {
//         return await send();
//       } else {
//         throw new Error(Utils.encodeIntlError({id: 'app.noPermission'}));
//       }
//     },
//     async testNewsletter(root, args, context) {
//       if(context.currentUser && Users.isAdminById(context.currentUser._id))
//         return await send(true);
//     },
//     async addUserNewsletter(root, {userId}, context) {

//       const currentUser = context.currentUser;
//       const user = await Connectors.get(Users, userId);
//       if (!user || !Users.options.mutations.edit.check(currentUser, user, context)) {
//         throw new Error(Utils.encodeIntlError({id: 'app.noPermission'}));
//       }
//       return await subscribeUser(user, false);
//     },
//     async addEmailNewsletter(root, {email}, context) {
//       return await subscribeEmail(email, true);
//     },
//     async removeUserNewsletter(root, { userId }, context) {
//       const currentUser = context.currentUser;
//       const user = await Connectors.get(Users, userId);
//       if (!user || !Users.options.mutations.edit.check(currentUser, user, context)) {
//         throw new Error(Utils.encodeIntlError({id: 'app.noPermission'}));
//       }

//       try {
//         return await unsubscribeUser(user);
//       } catch (error) {
//         const errorMessage = error.message.includes('subscription-failed') ? Utils.encodeIntlError({id: 'newsletter.subscription_failed'}) : error.message;
//         throw new Error(errorMessage);
//       }
//     },
//   },
// };
// addGraphQLResolvers(resolver);
