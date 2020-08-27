import React from 'react';
import ReactMarkdown from 'react-markdown';
import PageLayout from '../common/PageLayout';
import { Components } from 'meteor/vulcan:core';
import { postStatus } from '../../modules/data';
import Posts from '../../modules/posts/collection';
import PostCell from '../posts/PostCell';
import { LinkContainer } from 'react-router-bootstrap';

const PaginatedListItem = ({ document }) => <PostCell document={document} variant="medium" key={document._id} />;

const contents = `

> A webring (or web ring) is a collection of websites linked together in a circular structure, and usually organized around a specific theme, often educational or social. They were popular in the 1990s and early 2000s, particularly among amateur websites. <footer><cite>[Wikipedia](https://en.wikipedia.org/wiki/Webring)</cite></footer>


We're bringing webrings back! The Sidebar webring is a collection of handpicked sites and blogs focused on design and the web. Once a site is part of the Sidebar webring, its content will automatically get submitted to Sidebar. 

`;

const Webring = () => {
  let input = { filter: { status: { _eq: postStatus.published } }, sort: { postedAt: 'desc' } };

  return (
    <PageLayout name="webring" title="The Sidebar Webring">
      <ReactMarkdown source={contents} escapeHtml={false} />
      <LinkContainer to="/webring/apply">
        <Components.Button>Apply to Join</Components.Button>
      </LinkContainer>
      <div>
        <h2>Webring Feed</h2>
        <Components.PaginatedList
          className="post-list-contents"
          components={{
            PaginatedListItem,
          }}
          options={{
            collection: Posts,
            fragmentName: 'PostFragment',
            input,
          }}
        />
      </div>
    </PageLayout>
  );
};

export default Webring;
