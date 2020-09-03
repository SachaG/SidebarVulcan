import React from 'react';
import ReactMarkdown from 'react-markdown';
import { expandQueryFragments, Components } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';
import WebringSites from '../../modules/sites/collection';
import PostCell from '../posts/PostCell';
import WebringSiteCell from './WebringSiteCell';
import { LinkContainer } from 'react-router-bootstrap';
import SidebarPortal from '../common/SidebarPortal.jsx';
import { webringStatus } from '../../modules/data';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Logo from '../common/Logo';
import WebringLogo from './WebringLogo';
import { Link } from 'react-router-dom';
import NewsletterForm from '../newsletters/NewsletterForm';

const PostListItem = ({ document }) => (
  <PostCell document={document} showWebring={true} variant="medium" key={document._id} />
);

const WebringListItem = ({ document }) => <WebringSiteCell document={document} key={document._id} />;
const contents = `

> A webring is a collection of websites linked together in a circular structure, and usually organized around a specific theme. They were popular in the 1990s and early 2000s. <cite>[Wikipedia](https://en.wikipedia.org/wiki/Webring)</cite>

We're bringing webrings back! The Sidebar webring is a collection of handpicked sites and blogs focused on design and the web. 

`;

// const contents = `We're bringing webrings back! The Sidebar webring is a collection of handpicked sites and blogs focused on design and the web.`;

// const applyContents = `
// Anybody can apply to join, but to increase your chances of being accepted we recommend already having had two or three pieces of content published in Sidebar.

// Note that once your site is part of the Sidebar webring, your RSS feed's content will automatically get submitted to Sidebar.
// `;

const Webring = () => {
  const webringQuery = expandQueryFragments(`
  query webringQuery {
    webring {
      ...WebringSiteFullFragment
    }
  }
  `);

  const { loading, data = {} } = useQuery(gql(webringQuery));

  console.log(data);
  return (
    <div className="webring-wrapper">
      <Components.HeadTags
        title={`Sidebar Webring`}
        description="We're bringing webrings back! The Sidebar Webring is a collection of handpicked sites and blogs focused on design and the web."
        url="https://sidebar.io/webring"
      />

      <div className="webring-header webring-colorscale">
        <div className="webring-header-item">
          <div>
            <Link className="logo-link webring-logo-link" to="/">
              <WebringLogo />
            </Link>
          </div>
        </div>
        <div className="webring-header-item">
          <div>
            <h3 className="webring-header-item-title">Subscribe to All Feeds</h3>
            <p>Import this file into your RSS reader to load all webring feeds at once.</p>
            <Components.Button href="/webring/opml">Download OPML File</Components.Button>
          </div>
        </div>
        <div className="webring-header-item">
          <div>
            <h3 className="webring-header-item-title">Sign Up for the Newsletter</h3>
            <p>Get the best of the webring (and more!) in your inbox every weekday.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="webring-header-item">
          <div>
            <h3 className="webring-header-item-title">Join the Webring</h3>
            <p>Add your design blog to the Sidebar Webring.</p>
            <LinkContainer to="/webring/apply">
              <Components.Button>Apply to Join</Components.Button>
            </LinkContainer>
          </div>
        </div>
      </div>

      <div className="webring-intro">
        <h2 className="webring-intro-heading">Let’s bring webrings back!</h2>
        <div className="webring-intro-quote">
          <blockquote>
            “A <strong>webring</strong> is a collection of websites linked together in a circular structure and organized around a specific theme. They were popular in the 1990s and early 2000s.”
            <cite>
              <a href="https://en.wikipedia.org/wiki/Webring" target="_blank" rel="noreferrer noopener">
                Wikipedia
              </a>
            </cite>
          </blockquote>
        </div>
        <div className="webring-intro-text">
          The Sidebar Webring is a collection of handpicked sites and blogs focused on design and the web.
        </div>
      </div>

      {loading ? (
        <Components.Loading />
      ) : (
        <div className="webring-sites">
          {data.webring &&
            data.webring.map((webringSite) => (
              <WebringSiteCell variant="large" document={webringSite} key={webringSite._id} />
            ))}
        </div>
      )}

      {/* <div className="webring-footer webring-colorscale">
        <div className="webring-footer-item">
          <ReactMarkdown source={applyContents} escapeHtml={false} />
          <LinkContainer to="/webring/apply">
            <Components.Button>Apply to Join</Components.Button>
          </LinkContainer>
        </div>
        <div className="webring-footer-item">
          <Components.Button href="mailto:webring@sidebar.io">Get in Touch</Components.Button>
        </div>
      </div> */}

      {/* <div className="webring-sites">
        <h3>Member Sites</h3>
        <Components.PaginatedList
          className="webring-list-contents"
          components={{
            PaginatedListItem: WebringListItem,
          }}
          options={{
            collection: WebringSites,
            fragmentName: 'WebringSiteFragment',
            input: membersInput,
          }}
        />
      </div> */}

      {/* <div className="webring-feed">
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
        </div> */}
    </div>
  );
};

export default Webring;
