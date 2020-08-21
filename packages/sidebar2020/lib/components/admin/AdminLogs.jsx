import React from 'react';
import { Components } from 'meteor/vulcan:core';
import Logs from '../../modules/logs/collection.js';

const AdminLogs = () => (
  <div className="admin-logs">
    <Components.Datatable
      collection={Logs}
      options={{
        fragmentName: 'LogFragment',
      }}
      showNew={false}
      showEdit={false}
      columns={[
        'createdAt',
        '_id',
        'ip',
        'method',
        // 'originalUrl',
        'url',
        // 'remoteAddress',
        'query',
        { name: 'headers', component: Headers },
        { name: 'body', component: Body },
      ]}
    />
  </div>
);

const Headers = ({ document }) => (
  <div>
    <Components.ModalTrigger label="Show Headers" title="Headers">
      <pre>
        <code>{JSON.stringify(document.headers, '', 2)}</code>
      </pre>
    </Components.ModalTrigger>
  </div>
);

const Body = ({ document }) => (
  <div>
    <Components.ModalTrigger label="Show Body" title="Body">
      <div>
        <pre>
          <code>{JSON.stringify(document.body, '', 2)}</code>
        </pre>
        {document.body && document.body.query && (
          <div>
            <hr />
            <h4>GraphQL Query</h4>
            <pre>
              <code>{document.body.query.replace(/\\n/g, /\n/)}</code>
            </pre>
          </div>
        )}
      </div>
    </Components.ModalTrigger>
  </div>
);

export default AdminLogs;
