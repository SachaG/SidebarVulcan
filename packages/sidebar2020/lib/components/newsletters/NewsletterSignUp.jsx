import React, { useEffect, useState } from 'react';
import sample from 'lodash/sample';
import NewsletterForm from './NewsletterForm';

const startDate = new Date('2012/10/10');
const dayCount = Math.round((new Date() - startDate) / (1000 * 60 * 60 * 24));

const ctas = [
  { a: 'Say no to Sidebar-less inboxes', b: `Make your inbox happy with Sidebar's daily newsletter.` },
  {
    // a: 'Save a tab, save the planet',
    a: 'Websites suck',
    b: 'Get the daily Sidebar newsletter instead and never open this browser tab again.',
  },
  { a: 'One, two, three, four', b: `The daily Sidebar newsletter is unlike any other you've seen before!` },
  { a: 'Not enough email?', b: `Sign up for the daily Sidebar newsletter and say goodbye to that sad, empty inbox!` },
  {
    a: 'Just like a podcast',
    b: `But daily, in written form, and made of links. So not really like a podcast actually.`,
  },
];

const ctas2 = [
  { a: 'Not the newsletter you need', b: 'But the daily newsletter you deserve. Wait, or is it the other way around?' },

  { a: 'Witty tagline goes here', b: `Smart call-out for the Sidebar daily newsletter coming soon.` },

  { a: 'Electronic Mail!', b: `Experience the future today with the daily Sidebar newsletter.` },
  { a: `Your favorite rapper's favorite newsletter`, b: `The official daily design newsletter of the #thuglife.` },
  {
    a: `Smash that subscribe button!`,
    b: `Actually, just clicking it gently is enough to get the daily Sidebar newsletter.`,
  },
  { a: `The cake is a lie`, b: `But the daily Sidebar newsletter isn't` },
  { a: `Day ${dayCount}`, b: `Still sending out the daily Sidebar newsletter.` },
  { a: `Now this is a story all about how`, b: `The daily Sidebar newsletter will turn your life upside down.` },
  { a: `Never gonna give you up`, b: `Always gonna send you the daily Sidebar newsletter.` },
  { a: `Snakes`, b: `We promise to never send you any; only the daily Sidebar newsletter.` },
  { a: `Gotta catch 'em all!`, b: `The daily Sidebar newsletters, that is.` },
  {
    a: `Help! I'm trapped inside the computer!`,
    b: `The only way to save me is to subscribe to the daily Sidebar newsletter.`,
  },
  {
    a: `According to the multiverse theory`,
    b: `There are infinite universes where you've already subscribed to the daily Sidebar newsletter.`,
  },
  { a: `Ask your doctor about it`, b: `The daily Sidebar newsletter could help you lose weight and sleep better.` },
  { a: `Omae wa mou subscribeiru`, b: `Nani!!??.` },
  { a: `The answer is 42`, b: `Or alternatively, subscribing to the daily Sidebar newsletter.` },
  {
    a: `Rule 34`,
    b: `The newsletter gently slid into the welcoming inbox, engorged with the passion of design links.`,
  },
  { a: `Cannot read property of undefined`, b: `Would you like to read the Sidebar daily newsletter instead?` },
  { a: `A series of tubes`, b: `All eventually leading to the Sidebar daily newsletter.` },
  { a: `All out of ice cream?`, b: `The Sidebar daily newsletter is the second bestest thing.` },
  { a: `–Janet?`, b: `–Yes Michael? –Sign me up for the Sidebar daily newsletter.` },
];

const reloadCta = {
  a: 'Stop reloading',
  b: 'And just subscribe to the daily Sidebar newsletter already.',
};

const completedCta = {
  a: `You've seen them all!`,
  b: `We promise, we were keeping track. You're free now.`,
};

const NewsletterSignUp = () => {
  // const cta = sample(ctas);

  const [cta, setCta] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);
  // const { a, b } = cta;

  useEffect(() => {
    setCta(sample(ctas));
  }, []);

  return (
    <div className="newslettersignup">
      <div className="newslettersignup-inner">
        <h3 className="newslettersignup-tagline">The Sidebar Newsletter</h3>
        {cta && (
          <div>
            <h3 className="newslettersignup-heading">{cta.a}</h3>
            <h4 className="newslettersignup-subheading">{cta.b}</h4>
            <NewsletterForm />
          </div>
        )}
        <h4 className="newslettersignup-subtagline">5 Design Links in Your Inbox Every Weekday</h4>
      </div>
    </div>
  );
};

export default NewsletterSignUp;
