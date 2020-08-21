export default {
  _id: {
    type: String,
    canRead: ["admins"],
  },
  ip: {
    type: String,
    canRead: ["admins"],
  },
  createdAt: {
    type: Date,
    canRead: ["admins"],
  },
  method: {
    type: String,
    canRead: ["admins"],
  },
  originalUrl: {
    type: String,
    canRead: ["admins"],
  },
  url: {
    type: String,
    canRead: ["admins"],
  },
  headers: {
    type: Object,
    canRead: ["admins"],
  },
  query: {
    type: Object,
    canRead: ["admins"],
  },
  body: {
    type: Object,
    canRead: ["admins"],
  },
  remoteAddress: {
    type: String,
    canRead: ["admins"],
  },
};
