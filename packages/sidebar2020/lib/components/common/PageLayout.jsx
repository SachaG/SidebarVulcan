import React from 'react';
import { Utils, Components } from 'meteor/vulcan:core';
import { useLocation } from 'react-router-dom';

const getPageClass = (title, name) => name || Utils.slugify(title);

const PageLayout = ({ title, action, description, name, children }) => {
  const location = useLocation();
  const url = Utils.getSiteUrl() + location.pathname.slice(1);
  return (
    <div className={`page page-${getPageClass(title, name)}`}>
      <Components.HeadTags title={`Sidebar | ${title}`} description={description} url={url} />
      <PageTitle title={title} action={action} />
      {children}
    </div>
  );
};

const PageTitle = ({ title, action }) => (
  <div className="page-heading">
    <h2 className="page-heading-title">{title}</h2>
    {action}
  </div>
);

export default PageLayout;
