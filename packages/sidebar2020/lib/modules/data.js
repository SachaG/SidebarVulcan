// note: all dates are stored in UTC, but displayed using this timezone
export const timezone = "Asia/Tokyo";

// length of a post excerpt
export const excerptLength = 30;

export const postStatus = {
  pending: 1,
  published: 2,
  deleted: 3,
  scheduled: 4, // scheduled in the future
  // sent: 5,
  spam: 5,
};

export const postStatusReverse = {
  1: "pending",
  2: "published",
  3: "deleted",
  4: "scheduled",
  // 5: "sent",
  5: "spam",
};

export const postStatusOptions = [
  {
    value: 1,
    label: "pending",
    description: "This link is pending"
  },
  {
    value: 2,
    label: "published",
    description: "This link has been published on Sidebar"
  },
  {
    value: 3,
    label: "deleted",
    description: "This link has been marked as deleted"
  },
  {
    value: 4,
    label: "scheduled",
    description: "This link is scheduled to be published at a future date"
  },
  // {
  //   value: 5,
  //   label: "sent",
  // },
  {
    value: 5,
    label: "spam",
    description: "This link has been marked as spam"
  },
];

export const jobStatusOptions = [
  {
    value: 1,
    label: "unpaid",
  },
  {
    value: 2,
    label: "paid",
  },
  {
    value: 3,
    label: "archived",
  },
];

export const newsletterStatus = {
  draft: 1,
  scheduled: 2,
  sent: 3,
  error: 4,
};

export const newsletterStatusOptions = [
  {
    value: 1,
    label: "draft",
  },
  {
    value: 2,
    label: "scheduled",
  },
  {
    value: 3,
    label: "sent",
  },
  {
    value: 4,
    label: "error",
  },
];

export const newsletterStatusReverse = {
  1: "draft",
  2: "scheduled",
  3: "sent",
  4: "error",
};

export const basePostPrice = 950;
export const baseJobPrice = 250;
