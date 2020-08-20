import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withAccess, withMessages } from 'meteor/vulcan:core';
import Newsletters from '../../modules/newsletters/collection.js';
import CardItemDate from './CardItemDate';
import { newsletterStatusReverse, newsletterStatus } from '../../modules/data.js';

const Preview = ({ document }) => (
  <div>
    <Components.ModalTrigger title="Preview" component={<Components.Button>Preview</Components.Button>}>
      <div className="newsletter-preview">
        <iframe srcDoc={document.html} sandbox />
      </div>
    </Components.ModalTrigger>
  </div>
);

const Code = ({ document }) => (
  <div>
    <Components.ModalTrigger title="Code" component={<Components.Button>Code</Components.Button>}>
      <div className="newsletter-code">
        <textarea>{document.html}</textarea>
      </div>
    </Components.ModalTrigger>
  </div>
);

const Data = ({ document }) => (
  <div>
    <Components.ModalTrigger title="Data" component={<Components.Button>Data</Components.Button>}>
      <div className="newsletter-data">
        <pre>
          <code>{JSON.stringify(document.data, '', 2)}</code>
        </pre>
      </div>
    </Components.ModalTrigger>
  </div>
);

const Status = ({ document }) =>
  document.status ? (
    document.status === newsletterStatus.error ? (
      <Components.ModalTrigger title="Sending Error" component={<StatusIndicator document={document} />}>
        <pre>
          <code>{JSON.stringify(document.error, '', 2)}</code>
        </pre>
      </Components.ModalTrigger>
    ) : (
      <StatusIndicator document={document} />
    )
  ) : null;

const StatusIndicator = ({ document }) => (
  <span className={`status-indicator status-indicator-${newsletterStatusReverse[document.status]}`}>
    {newsletterStatusReverse[document.status]}
  </span>
);

const Test = ({ document }) => (
  <Components.MutationButton
    label="Test"
    variant="primary"
    mutationOptions={{
      name: 'testNewsletter',
      args: { newsletterId: 'String' },
      fragmentName: 'NewsletterFragment',
    }}
    mutationArguments={{ newsletterId: document._id }}
  />
);

const Send = ({ document }) => (
  <Components.MutationButton
    label="Send"
    variant="primary"
    mutationOptions={{
      name: 'sendNewsletter',
      args: { newsletterId: 'String' },
      fragmentName: 'NewsletterFragment',
    }}
    mutationArguments={{ newsletterId: document._id }}
  />
);

const AdminNewsletters = () => (
  <div className="admin-newsletters">
    <Components.Datatable
      collection={Newsletters}
      columns={[
        { name: 'createdAt', label: 'Created', sortable: true, contents: 'date', filterable: true },
        { name: 'sentAt', label: 'Scheduled', sortable: true, contents: 'date', filterable: true },
        'subject',
        // 'provider',
        { name: 'postsIds', label: 'Posts' },
        { name: 'html', label: 'Preview', component: Preview },
        { name: 'code', label: 'Code', component: Code },
        { name: 'data', label: 'Data', component: Data },
        { name: 'status', filterable: true, component: Status },
        // { name: 'test', label: 'Test', component: Test },
        // { name: 'send', label: 'Send', component: Send },
      ]}
      options={{
        fragmentName: 'NewsletterFragment',
      }}
      showNew={true}
      showEdit={true}
      newFormOptions={{
        queryFragmentName: 'NewsletterFragment',
      }}
      editFormOptions={{
        queryFragmentName: 'NewsletterFragment',
      }}
      components={{
        CardItemDate,
      }}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/log-in',
};

registerComponent('AdminNewsletters', AdminNewsletters);

export default AdminNewsletters;
