import React from 'react';
import { Utils } from 'meteor/vulcan:core';

const getPageClass = (title, name) => name || Utils.slugify(title);

const PageLayout = ({ title, action, name, children }) => (
  <div className={`page page-${getPageClass(title, name)}`}>
    <PageTitle title={title} action={action}/>
    {children}
  </div>
);

const PageTitle = ({ title, action }) => (
  <div className="page-heading">
    <h2 className="page-heading-title">{title}</h2>
    {action}
  </div>
);

export default PageLayout;
