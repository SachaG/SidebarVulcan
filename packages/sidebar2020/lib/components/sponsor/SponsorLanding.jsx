import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Components } from 'meteor/vulcan:core';
import { LinkContainer } from 'react-router-bootstrap';
import PageLayout from '../common/PageLayout';

const contents = `

## Advertise with Sidebar

If you've got a great product and you think the Sidebar audience should know about it, you can take out a sponsored link.

### Details

Sponsored links cost $950 per sponsorship (note: discounts are available for bootstrapped and independent companies), and are included in the following places:

- In one edition of the daily newsletter (~40k subscribers).
- On the homepage for one day (~1.5k uniques/day).
- In Sidebar's [Twitter feed](https://twitter.com/sidebario) (~22k followers).
- On Sidebar's [Facebook page](https://www.facebook.com/SidebarIO) (2.3k likes).

Sponsored links can get anywhere from 2k to 4k click-through depending on the content. Questions? [Get in touch](mailto:sponsor@sidebar.io).

### Guidelines

Sponsored links should be relevant to Sidebar's design-focused audience and link to high-quality, well-designed content. Also, if you would like to take out multiple links for the same product, please make sure they are at least one month apart each. 

### Approval

After you complete the payment, your sponsored link will be reviewed to see if it matches up well with Sidebar's audience. In case it doesn't, you will be fully refunded within a week. 

### Refunds

Sponsorships can be refunded any time up to two weeks before the scheduled date by emailing [sponsor@sidebar.io](mailto:sponsor@sidebar.io).

### What People Are Saying

> “The campaign was pretty much **one of the best we have ever run**. Overall it’s highly likely we will have a very fast ROI for this campaign, which in our experience is quite rare.”

<cite>Matt Milosavljevic, [BugHerd](http://bugherd.com)</cite>

> “[The sponsorship] ended up breaking even on the cost vs. revenue. **Having broken even is really good**, given my previous experience with other lists that have 50K-100K users that we spent thousands of dollars to promote on and didn’t get much return from.”

<cite>Amir Khella, [Keynotopia](http://keynotopia.com/)</cite>

> Sidebar was brilliant, the audience is perfect for our product and **we got a huge bump in signups**. What's also interesting is that it spurred several blog posts about Marvel from design and tech authors who are subscribed to the email.

<cite>Murat Mutlu, [Marvel](https://marvelapp.com/)</cite>

> Thanks to Sidebar readers, I reached new users and **got a lot of exposure on Twitter** and other sites. Sponsoring Sidebar was one of my best investments.

<cite>Carlos Alvarez, [Black Tie](http://www.blacktie.co)</cite>

> The immediate income from promoting Workshop on Sidebar is already **3x the posting fee**.

<cite>Robert Williams, [Workshop](http://letsworkshop.com)</cite>
`;

const SponsorLanding = () => (
  <PageLayout title="Advertise with Sidebar" name="sponsor-landing"  description="Reach over 40,000 designers">
    <p>
      If you’ve got a great product and you think the Sidebar audience should know about it, you can take out a
      sponsored link.
    </p>
    <div className="sponsor-cta">
      <LinkContainer to="/sponsor/submit">
        <Components.Button>Submit Sponsored Link</Components.Button>
      </LinkContainer>
    </div>
    <ReactMarkdown source={contents} escapeHtml={false} />
  </PageLayout>
);

export default SponsorLanding;
