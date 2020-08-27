import React from 'react';
import ReactMarkdown from 'react-markdown';
import PageLayout from '../common/PageLayout';
import { Components } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';
import WebringSites from '../../modules/sites/collection';
import PostCell from '../posts/PostCell';
import WebringSiteCell from './WebringSiteCell';
import { LinkContainer } from 'react-router-bootstrap';
import SidebarPortal from '../common/SidebarPortal.jsx';

const PostListItem = ({ document }) => <PostCell document={document} variant="medium" key={document._id} />;

const WebringListItem = ({ document }) => <WebringSiteCell document={document} key={document._id} />;

const contents = `

> A webring (or web ring) is a collection of websites linked together in a circular structure, and usually organized around a specific theme, often educational or social. They were popular in the 1990s and early 2000s, particularly among amateur websites. <cite>[Wikipedia](https://en.wikipedia.org/wiki/Webring)</cite>


We're bringing webrings back! The Sidebar webring is a collection of handpicked sites and blogs focused on design and the web. 

Anybody can apply to join, but to increase your chances of being accepted we recommend already having had two or three pieces of content published in Sidebar. 

Note that once your site is part of the Sidebar webring, your RSS feed's content will automatically get submitted to Sidebar. 
`;

const Webring = () => {
  const feedInput = {
    filter: { webringSiteId: { _is_null: false } },
    sort: { postedAt: 'desc' },
    limit: 5,
  };
  
  return (
    <PageLayout name="webring" title="The Sidebar Webring">
      <div className="webring-header">
        <ReactMarkdown source={contents} escapeHtml={false} />
        <LinkContainer to="/webring/apply">
          <Components.Button>Apply to Join</Components.Button>
        </LinkContainer>
      </div>
      <div className="webring-sites">
        <h3>Member Sites</h3>
        <Components.PaginatedList
          className="webring-list-contents"
          components={{
            PaginatedListItem: WebringListItem,
          }}
          options={{
            collection: WebringSites,
            fragmentName: 'WebringSiteFragment',
            input: {},
          }}
        />
      </div>

      <SidebarPortal>
        <div className="webring-feed">
          <h2>Webring Feed</h2>
          <div className="post-list">
            <Components.PaginatedList
              className="post-list-contents"
              components={{
                PaginatedListItem: PostListItem,
                PaginatedListLoadMore: () => null,
              }}
              options={{
                collection: Posts,
                fragmentName: 'PostFragment',
                input: feedInput,
              }}
            />
            <LinkContainer to="/webring/feed">
              <Components.Button>View More</Components.Button>
            </LinkContainer>
          </div>
        </div>
      </SidebarPortal>
    </PageLayout>
  );
};

export default Webring;
