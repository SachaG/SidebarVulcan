/*

MongoDB indexes for geographic search and performance

*/

import Posts from "../modules/posts/collection";
import { Charges } from "meteor/vulcan:payments";

Posts.rawCollection().createIndex({ userId: 1 });
Posts.rawCollection().createIndex({ url: 1 });
Posts.rawCollection().createIndex({ status: 1, url: 1 });
Posts.rawCollection().createIndex({ domain: 1 });
Posts.rawCollection().createIndex({ categoriesIds: 1 });
Posts.rawCollection().createIndex({ createdAt: -1 });
Posts.rawCollection().createIndex({ postedAt: -1 });
Posts.rawCollection().createIndex({ status: 1 });
Posts.rawCollection().createIndex({ status: 1, createdAt: -1, postedAt: -1 });

Charges.rawCollection().createIndex({ associatedId: 1 });
