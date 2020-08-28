import React from 'react';
import { Components, getApolloClient, Utils, useCurrentUser } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';
import gql from 'graphql-tag';
import SponsorPreview from './SponsorPreview';
import { useHistory, useParams, Link } from 'react-router-dom';
import PageLayout from '../common/PageLayout';

const convertForPreview = (d) => {
  const { body, url, categoriesIds, credit } = d;
  if (credit) d.credit = credit;
  if (body) d.htmlBody = body;
  if (url) d.domain = Utils.getDomain(url);
  if (categoriesIds) {
    d.categories =
      d.categoriesIds &&
      d.categoriesIds.map((c) => {
        const client = getApolloClient();
        const result = client.readFragment({
          id: `Category:${c}`, // `id` is any id that could be returned by `dataIdFromObject`.
          fragment: gql`
            fragment myCategory on Category {
              _id
              name
            }
          `,
        });
        return result;
      });
  }
  return d;
};

const FormLayout = ({ FormComponents, formProps, errorProps, repeatErrors, submitProps, children, commonProps }) => (
  <FormComponents.FormElement {...formProps}>
    <SponsorPreview document={convertForPreview(commonProps.document)} showEdit={false} />

    <FormComponents.FormErrors {...errorProps} />

    {children}

    {repeatErrors && <FormComponents.FormErrors {...errorProps} />}

    <FormComponents.FormSubmit {...submitProps} />
  </FormComponents.FormElement>
);

const SponsorSubmit = () => {
  const history = useHistory();
  const { code } = useParams();
  const { currentUser } = useCurrentUser();
  const prefilledProps = { isSponsored: true };
  const fields = ['url', 'title', 'credit', 'body', 'categoriesIds', 'scheduledAt'];
  if (code) {
    fields.push('discountCode');
    prefilledProps.discountCode = code;
  }
  return (
    <PageLayout name="sponsor-submit" title="Submit a Sponsored Link" description="Reach over 40,000 designers">
      {currentUser ? (
        <Components.SmartForm
          prefilledProps={prefilledProps}
          collection={Posts}
          fields={fields}
          components={{
            FormLayout,
          }}
          successCallback={(document) => {
            history.push(`/sponsor/checkout/${document._id}`);
          }}
        />
      ) : (
        <p>
          Please <Link to="/log-in?redirect=/sponsor/submit">log in or sign up</Link> first.
        </p>
      )}
    </PageLayout>
  );
};

export default SponsorSubmit;
