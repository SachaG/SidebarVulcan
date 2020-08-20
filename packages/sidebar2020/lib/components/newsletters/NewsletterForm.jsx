import React, { useState } from 'react';
import { Components } from 'meteor/vulcan:core';

const NewsletterForm = () => {
  const [email, setEmail] = useState();
  const [working, setWorking] = useState(false);
  const [completed, setCompleted] = useState(false);

  return (
    <div className="newsletterform">
      {completed ? (
        <div className="newsletterform-success">Thanks for subscribing!</div>
      ) : (
        <div className="newsletterform-inner">
          <Components.FormComponentEmail
            inputProperties={{
              placeholder: 'Your Email',
              value: email,
              disabled: working,
              onChange: (e) => {
                e.preventDefault();
                setEmail(e.target.value);
              },
            }}
            itemProperties={{ layout: 'elementOnly' }}
          />
          <Components.MutationButton
            label="Subscribe"
            variant="primary"
            mutationOptions={{
              name: 'addEmailNewsletter',
              args: { email: 'String' },
              fragmentName: 'NewsletterResponseFragment',
            }}
            mutationArguments={{ email }}
            submitCallback={() => {
              setWorking(true);
            }}
            successCallback={(result) => {
              setWorking(false);
              setCompleted(true);
            }}
            errorCallback={(result) => {
              setWorking(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;