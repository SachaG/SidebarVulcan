import React from 'react';
import NewsletterSignUp from '../newsletters/NewsletterSignUp';
import FeaturedJob from '../jobs/FeaturedJob';

const SideColumnBottom = ({ index }) => (
  <div className="sidecolumn-two">{index === 0 ? <NewsletterSignUp /> : index === 1 ? <FeaturedJob /> : null}</div>
);

export default SideColumnBottom;
