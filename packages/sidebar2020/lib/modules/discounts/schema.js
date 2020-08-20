
const schema = {
  _id: {
    type: String,
    optional: true,
    canRead: ['admins'],
  },

  code: {
    type: String,
    optional: true,
    canRead: ['admins'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },

  amount: {
    type: Number,
    optional: true,
    canRead: ['admins'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    description: 'Discount percentage without the "%"'
  },
};

export default schema;
