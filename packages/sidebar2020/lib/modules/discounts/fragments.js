import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment DiscountFragment on Discount {
    _id
    code
    amount
  }
`);