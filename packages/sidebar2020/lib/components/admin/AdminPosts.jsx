/*

Show a list of all bookings

http://docs.vulcanjs.org/core-components.html#Datatable

*/

import React, { useState } from 'react';
import { Components, registerComponent, useMulti2, useRegisteredMutation, withMessages } from 'meteor/vulcan:core';
import { postStatusReverse, postStatus } from '../../modules/data.js';
import Posts from '../../modules/posts/collection.js';
import Newsletters from '../../modules/newsletters/collection.js';
import CardItemDate from './CardItemDate';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { useHistory } from 'react-router-dom';
import PostStatusIndicator from '../posts/PostStatusIndicator';
import NewsletterCell from '../newsletters/NewsletterCell';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import get from 'lodash/get';
import WebringIndicator from '../webring/WebringIndicator.jsx';

const Title = ({ document: post }) => (
  <div>
    <a target="_blank" rel="noopener noreferrer" href={post.url}>
      {post.title}
    </a>
    <span className="post-domain">{post.domain}</span>
  </div>
);

const Clicks = ({ document: post }) => (
  <div>
    <code>{post.clickCount}</code>
  </div>
);

const Status = ({ document: post }) => (
  <div className="post-status-cell">
    <PostStatusIndicator post={post} />
    {post.webringSite && <WebringIndicator post={post} />}
  </div>
);

const Sponsored = ({ document: post }) => (post.isSponsored ? <span className="post-sponsored">Sponsored</span> : null);

const DatatableSelect = ({ toggleItem, selectedItems, document, Components }) => {
  const value = selectedItems.includes(document._id);
  const onChange = (e) => {
    toggleItem(document._id);
  };
  return (
    <Components.DatatableCellLayout className="datatable-check">
      {document.status === postStatus.published && (
        <Components.FormComponentCheckbox
          inputProperties={{ value, onChange }}
          itemProperties={{ layout: 'elementOnly' }}
        />
      )}
    </Components.DatatableCellLayout>
  );
};

const DatatableSubmitSelected = ({ selectedItems }) => (
  <Components.ModalTrigger
    title={<FormattedMessage id="newsletters.send" />}
    component={
      <Components.Button>
        <FormattedMessage id="newsletters.send" />
      </Components.Button>
    }
  >
    <CreateNewsletterFormWithFlash selectedItems={selectedItems} />
  </Components.ModalTrigger>
);

const getSubject = (posts) => posts.map((p) => p.shortTitle).join(', ');

const CreateNewsletterForm = ({ selectedItems, closeModal, flash }) => {
  const history = useHistory();
  const input = { filter: { _id: { _in: selectedItems } } };
  const { results, loading } = useMulti2({ collection: Posts, fragmentName: 'PostFragment', input });
  return (
    <div>
      {loading ? (
        <Components.Loading />
      ) : (
        <Components.SmartForm
          collection={Newsletters}
          prefilledProps={{ postsIds: selectedItems, subject: getSubject(results) }}
          successCallback={(newsletter) => {
            closeModal();
            history.push('/admin/newsletters');
            flash(`Newsletter “${newsletter.subject}” created.`);
          }}
        />
      )}
    </div>
  );
};

const CreateNewsletterFormWithFlash = withMessages(CreateNewsletterForm);

const NewslettersComponent = ({ document }) =>
  document.newsletters.map((d) => <NewsletterCell key={d._id} document={d} />);

// const Actions = ({ document }) => (
//   <div>
//     <Approve document={document} />
//     <Spam document={document} />
//   </div>
// );

const Approve = ({ document }) =>
  document.status === postStatus.pending ? (
    <Components.MutationButton
      label="Approve"
      variant="primary"
      mutationOptions={{
        name: 'approvePost',
        args: { documentId: 'String' },
        fragmentName: 'PostFragment',
      }}
      mutationArguments={{ documentId: document._id }}
    />
  ) : null;

const Spam = ({ document }) => (
  <Components.MutationButton
    label="Spam"
    variant="primary"
    mutationOptions={{
      name: 'spamPost',
      args: { documentId: 'String' },
      fragmentName: 'PostFragment',
    }}
    mutationArguments={{ documentId: document._id }}
  />
);

const Actions = ({ document }) => {
  const [loading, setLoading] = useState(false);

  const approvePostMutation = useRegisteredMutation({
    name: 'approvePost',
    args: { documentId: 'String' },
    fragmentName: 'PostFragment',
  });
  const spamPostMutation = useRegisteredMutation({
    name: 'spamPost',
    args: { documentId: 'String' },
    fragmentName: 'PostFragment',
  });
  const approvePost = async () => {
    setLoading(true);
    await approvePostMutation({ documentId: document._id });
    setLoading(false);
  };
  const spamPost = async () => {
    setLoading(true);
    await spamPostMutation({ documentId: document._id });
    setLoading(false);
  };
  // const suggestSponsorship = () => {

  // };

  if (document.status !== postStatus.pending) {
    return null;
  }

  const email = encodeURIComponent(get(document, 'user.email'));
  const subject = encodeURIComponent(`Your Sidebar link submission (${document.url})`);
  const body = encodeURIComponent(`I'm really sorry but Sidebar doesn't usually feature links to apps or products. However, we do have a sponsorship option if you're interested. You can find more info here: 

https://sidebar.io/sponsor/

Sponsorships can be a great way to reach a lot of designers at once while also supporting Sidebar :) Feel free to reply to this email if you have any questions!

Sacha Greif`);
  const from = encodeURIComponent('sponsor@sidebar.io');
  const mailto = `mailto:${email}?subject=${subject}&body=${body}&from=${from}`;

  return (
    <SplitButton
      id="dropdown-split-variants-actions"
      variant="primary"
      className="actions-button"
      title={
        <span className={`actions-button-inner ${loading && 'actions-button-loading'}`}>
          <span className="actions-button-label">Approve</span>
          <span className="actions-button-spinner">{loading && <Components.Loading />}</span>
        </span>
      }
      onClick={approvePost}
    >
      <Dropdown.Item eventKey="1" onClick={spamPost}>
        Spam
      </Dropdown.Item>
      <Dropdown.Item eventKey="2" target="_blank" href={mailto}>
        Suggest Sponsorship
      </Dropdown.Item>
    </SplitButton>
  );
};

const AdminPosts = () => (
  <div className="admin-posts">
    <Components.Datatable
      collection={Posts}
      showSelect={true}
      columns={[
        // { name: 'createdAt', label: 'Created', sortable: true, contents: 'date', filterable: true },
        // { name: 'scheduledAt', label: 'Scheduled', sortable: true, contents: 'date', filterable: true },
        { name: 'postedAt', label: 'Posted', sortable: true, contents: 'date', filterable: true },
        // { name: 'sentAt', label: 'Sched.', sortable: true, contents: 'date', filterable: true },
        { name: 'title', component: Title },
        { name: 'clicks', component: Clicks, sortable: true },
        // { name: 'htmlBody', contents: 'html' },
        // {
        //   name: 'categoriesIds',
        //   label: 'Categories',
        //   filterable: true,
        //   // component: CategoriesIds
        // },
        {
          name: 'userId',
          //  component: User
        },
        { name: 'status', filterable: true, component: Status },
        { name: 'isSponsored', label: 'Sponsored', filterable: true, component: Sponsored },
        { name: 'newsletters', label: 'Newsletters', component: NewslettersComponent },
        { name: 'actions', label: 'Actions', component: Actions },
        // { name: 'spam', label: 'Spam', component: Spam },
      ]}
      rowClass={(post) => `post-item post-item-status-${postStatusReverse[post.status]}`}
      options={{
        fragmentName: 'PostFragment',
      }}
      initialState={{
        sort: {
          postedAt: 'desc',
        },
        filter: {
          status: {
            _in: [postStatus.pending, postStatus.published, postStatus.scheduled],
          },
        },
      }}
      showNew={true}
      showEdit={true}
      newFormOptions={{
        queryFragmentName: 'PostFragment',
        mutationFragmentName: 'PostFragment',
      }}
      editFormOptions={{
        queryFragmentName: 'PostFragment',
        mutationFragmentName: 'PostFragment',
        // addFields: ['clickCount'],
      }}
      components={{
        CardItemDate,
        DatatableSubmitSelected,
        DatatableSelect,
      }}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/log-in',
};

registerComponent('AdminPosts', AdminPosts);

export default AdminPosts;
