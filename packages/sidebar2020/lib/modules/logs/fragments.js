import { registerFragment } from "meteor/vulcan:core";

registerFragment(`
  fragment LogFragment on Log {
    _id
    ip
    createdAt
    method
    originalUrl
    url
    headers
    query
    remoteAddress
  }
`);
