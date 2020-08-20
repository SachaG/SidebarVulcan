// import EmbedURL from 'meteor/vulcan:embed';
import marked from 'marked';
import { Utils } from 'meteor/vulcan:core';
import { jobStatusOptions } from '../data.js';
import Users from 'meteor/vulcan:users';

const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: () => {
      return new Date();
    },
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    relation: {
      fieldName: 'user',
      typeName: 'User',
      kind: 'hasOne',
    },
  },

  // custom properties

  sentAt: {
    type: Date,
    optional: true,
  },

  company: {
    type: String,
    optional: false,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'text',
    order: 20,
  },

  url: {
    type: String,
    optional: true,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    // input: "text",
    // input: EmbedURL,
    order: 10,
  },

  title: {
    type: String,
    optional: false,
    max: 50,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'text',
    order: 20,
  },

  body: {
    type: String,
    optional: true,
    max: 200,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'textarea',
    order: 30,
  },

  htmlBody: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document }) => {
      if (document.body) {
        return Utils.sanitize(marked(document.body));
      }
    },
    onUpdate: ({ data }) => {
      if (data.body) {
        return Utils.sanitize(marked(data.body));
      }
    },
  },

  thumbnailUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    hidden: true,
  },

  status: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'radiogroup',
    onCreate: ({ document }) => {
      if (!document.status) {
        return 1;
      }
    },
    options: jobStatusOptions
  },

  paidAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    canUpdate: ['admins'],
    input: 'datetime',
  },

  archivedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    canUpdate: ['admins'],
    input: 'datetime',
  },

  chargeIds: {
    type: Array,
    arrayItem: {
      type: String,
      optional: true,
    },
    optional: true,
  },

  coupon: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
};

export default schema;
