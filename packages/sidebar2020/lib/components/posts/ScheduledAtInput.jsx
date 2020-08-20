import React from 'react';
import { Components } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const ScheduledAtInput = (props) =>
  Users.isAdmin(props.currentUser) ? (
    <Components.FormComponentDateTime {...props} />
  ) : (
    <Components.FormComponentRadioGroup {...props} />
  );

export default ScheduledAtInput;
