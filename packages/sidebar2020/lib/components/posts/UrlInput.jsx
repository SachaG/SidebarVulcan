import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Components, useRegisteredMutation } from 'meteor/vulcan:core';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { removeAtSymbol } from '../../modules/posts/helpers';

const UrlInput = ({ refFunction, inputProperties, itemProperties, updateCurrentValues, document }) => {
  const { title, body, credit } = document;

  const [loading, setLoading] = useState(false);

  const getUrlMetadata = useRegisteredMutation({
    name: 'getUrlMetadata',
    args: { url: 'String' },
    fragmentName: 'UrlFragment',
  });

  const handleOnBlur = async (e) => {
    const newUrl = e.target.value;
    // if either the title or body is empty, try to autofill it
    if (newUrl && (isEmpty(title) || isEmpty(body))) {
      setLoading(true);
      const result = await getUrlMetadata({ url: newUrl });
      const metadata = get(result, 'data.getUrlMetadata', {});
      // only autofill field if it's empty
      const updateObject = {};
      if (isEmpty(title) && metadata.title) {
        updateObject.title = metadata.title;
      }
      if (isEmpty(body) && metadata.description) {
        updateObject.body = metadata.description;
      }
      if (isEmpty(credit) && metadata.twitter) {
        updateObject.credit = removeAtSymbol(metadata.twitter);
      }
      updateCurrentValues(updateObject);
      setLoading(false);
    }
  };

  return (
    <Components.FormItem
      path={inputProperties.path}
      label={inputProperties.label}
      {...itemProperties}
      loading={loading}
    >
      <Form.Control ref={refFunction} {...inputProperties} onBlur={handleOnBlur} type="url" />
    </Components.FormItem>
  );
};

export default UrlInput;
