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

export default AdminLogs;
