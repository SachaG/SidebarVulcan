import React from 'react';
import { Components, useSingle2 } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';
import { useParams, useHistory, Link } from 'react-router-dom';
import SponsorPreview from './SponsorPreview';
import { getPostSponsorshipPrice } from '../../modules/posts/helpers';
import { formatMoney } from '../../modules/helpers';
import { basePostPrice } from '../../modules/data';
import ReactMarkdown from 'react-markdown';
import PageLayout from '../common/PageLayout';

const contents = `

### FAQ

#### Where Will My Link Appear?

By getting a sponsored link on Sidebar, your link will be:

- Featured on the **Sidebar homepage** (2k+ visitors/day).
- Included in Sidebar's **searchable archives** forever.
- Sent out as part of the **Sidebar newsletter** (40k+ subscribers).
- Tweeted out by the Sidebar [Twitter account](https://twitter.com/SidebarIO) (25k+ followers).
- Shared on Sidebar's [Facebook page](https://facebook.com/SidebarIO) (3k+ subscribers)</a>.
- Included in Sidebar's [API feed](https://sidebar.io/api).
- Included in Sidebar's [RSS feed](https://sidebar.io/feed.xml).
- Shared by Sidebar's **content partners** (such as [Fragments](https://fragments.pro/), [Panda](https://usepanda.com/), and more).

Total estimated reach: over **100,000** readers.

#### Can I Modify My Link Later?

You can modify your link, title and description through your Sidebar account anytime up until its publication.

If you would like to change the publication date, please [get in touch](mailto:sponsor@sidebar.io).

#### What's Your Refund Policy?

You can get a **full refund** up to one week before the link's scheduled publishing date. 

#### How Can I Get In Touch?

Just contact [sponsor@sidebar.io](mailto:sponsor@sidebar.io).
`;

const SponsorCheckout = () => {
  const { postId } = useParams();
  const { document, loading, error } = useSingle2({
    collection: Posts,
    input: { id: postId },
    fragmentName: 'PostFragment',
  });
  return (
    <PageLayout name="sponsor-checkout" title="Complete Your Payment">
      {loading ? (
        <Components.Loading />
      ) : (
        <div>
          <SponsorPreview loading={loading} document={document} showEdit={true} />

          {document.paidAt ? <SponsorThanks document={document} /> : <SponsorCheckoutActions document={document} />}

          <div className="sponsor-checkout-text">
            <ReactMarkdown source={contents} escapeHtml={false} />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

const SponsorThanks = ({ document }) => (
  <div className="sponsor-checkout-thanks">
    Thanks for completing checkout! <Link to="/account">View your submitted links →</Link>
  </div>
);

const SponsorCheckoutActions = ({ document }) => {
  const history = useHistory();
  return (
    <div className="sponsor-checkout-actions">
      <Components.Checkout
        productKey="sponsorship"
        associatedCollection={Posts}
        associatedDocument={document}
        properties={{
          title: document.title,
          url: document.url,
        }}
        fragmentName="PostFragment"
        button={
          <Components.Button className="buy-sponsored-post-link" type="submit" variant="primary">
            Complete Payment ({formatMoney(getPostSponsorshipPrice(document.discountAmount))})
          </Components.Button>
        }
        successCallback={(response) => {
          history.push(`/sponsor/thanks/${document._id}`);
        }}
      />
      {document.discountCode && (
        <Discount discountAmount={document.discountAmount} discountCode={document.discountCode} />
      )}
    </div>
  );
};

const Discount = ({ discountAmount, discountCode }) => (
  <div className="sponsor-discount">
    <span className="sponsor-discount-base">{formatMoney(basePostPrice)}</span>{' '}
    <span className="sponsor-discount-price">{formatMoney(getPostSponsorshipPrice(discountAmount))}</span>{' '}
    <span className="sponsor-discount-text">with code</span>{' '}
    <code className="sponsor-discount-code">{discountCode}</code>{' '}
    <span className="sponsor-discount-amount">({discountAmount}% off)</span>
  </div>
);

export default SponsorCheckout;
