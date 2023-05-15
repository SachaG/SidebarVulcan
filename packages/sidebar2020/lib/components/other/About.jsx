import React from 'react';
import ReactMarkdown from 'react-markdown';
import PageLayout from '../common/PageLayout';
import { Components } from 'meteor/vulcan:core';

const contents = `

Sidebar has been collecting the best design links of the day since October 2012. It's maintained by [Sacha Greif](http://twitter.com/sachagreif) and built with [Vulcan.js](http://vulcanjs.org/). Sidebar's code is open-source and [available on GitHub](https://github.com/SachaG/SidebarVulcan/).

## Submission Guidelines

Sidebar links can be anything from an article, to a beautiful porfolio, to a cool CodePen demo. Here are a few pointers to boost your submission's chances of making the cut.

Note that posting your own content is fine as long as it follows the guidelines below. 

### High Effort

It's easy to create a new Medium account and write out your thoughts about design, but we try to avoid featuring this kind of content on Sidebar. Instead, we prioritize the type of content that requires time and effort: case studies, tutorials, and so on. 

We also discourage cookie-cutter content like list posts or articles that simply link through to original content.

### New Content Only

Only new content is featured on Sidebar. This means if the link you're submitting has been around for longer than a few month or so, it probably won't be accepted (unless it hasn't received any exposure at all).

A good way to verify when a piece of content first appeared is to check when it was first tweeted out. 

### No Paid Products

Sidebar generally avoids featuring paid products unless they offer a free or demo version that can be useful on its own. On the other hand, submitting a case study *about* a paid product is fine as long as the case study itself provides value to the reader independently of the product. 

Exceptions to this rule include releases of major design software (Photoshop, Sketch, etc.) that are newsworthy in themselves. 

### Easy To Consume

Generally speaking, links that require a heavy download or a plugin install will not be featured. This includes links to app stores, to PDF files, etc. Videos are also rarely featured as they are harder to consume compared to textual content. 

`;

const About = () => {
  return (
    <PageLayout name="about" title="About" description="Learn more about Sidebar">
      <ReactMarkdown>{contents}</ReactMarkdown>
    </PageLayout>
  );
};

export default About;
