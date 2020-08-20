import { addStrings, registerLocale } from 'meteor/vulcan:core';

registerLocale({
  id: 'en',
  aliases: ['en_US', 'en_UK'],
  label: 'English',
  domains: ['http://localhost:3000', 'http://sidebar.io'],
  required: true,
});

addStrings('en', {
  'nav.dashboard': 'Dashboard',
  'nav.users': 'Users',
  'nav.posts': 'Posts',
  'nav.categories': 'Categories',
  'nav.newsletters': 'Newsletters',
  'nav.jobs': 'Jobs',
  'nav.charges': 'Charges',

  'newsletters.send': 'Send Newsletter',

  'app.duplicate_post': 'Sorry, this link has already been published recently.',
  'app.missing_scheduled_at': 'Please pick a date to schedule the link',

  'paginatedlist.no_results': 'No Results',
})