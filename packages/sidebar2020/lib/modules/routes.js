import { addRoute, getSetting } from 'meteor/vulcan:core';
// import SbPage from '../components/common/SbPage.jsx';
import Home from '../components/common/Home.jsx';
import HomeLayout from '../components/common/HomeLayout.jsx';

import LogIn from '../components/common/LogIn.jsx';
import LogInFinish from '../components/common/LogInFinish.jsx';
import UserAccount from '../components/users/UserAccount.jsx';

import About from '../components/other/About.jsx';
import Leaderboard from '../components/other/Leaderboard.jsx';

import PostList from '../components/posts/PostList';
import PostSubmit from '../components/posts/PostSubmit';
import PostThanks from '../components/posts/PostThanks';

import CategoryList from '../components/categories/CategoryList';

import AdminPosts from '../components/admin/AdminPosts.jsx';
import AdminUsers from '../components/admin/AdminUsers.jsx';
import AdminCategories from '../components/admin/AdminCategories.jsx';
import AdminNewsletters from '../components/admin/AdminNewsletters.jsx';
import AdminJobs from '../components/admin/AdminJobs.jsx';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import AdminDiscounts from '../components/admin/AdminDiscounts.jsx'
import AdminCharges from '../components/admin/AdminCharges.jsx';
import AdminLogs from '../components/admin/AdminLogs.jsx';

import SponsorLanding from '../components/sponsor/SponsorLanding.jsx';
import SponsorSubmit from '../components/sponsor/SponsorSubmit.jsx';
import SponsorCheckout from '../components/sponsor/SponsorCheckout.jsx';
import SponsorThanks from '../components/sponsor/SponsorThanks.jsx';

const adminAccessOptions = {
  groups: ['admins'],
  redirect: '/log-in',
}

const routes = [
  {name:'home',                 path: '/',                          component: Home, layoutComponent: HomeLayout},

  {name:'login',                path: '/log-in',                    component: LogIn},
  {name:'login.finish',         path: '/log-in/finish',             component: LogInFinish},

  {name:'account',              path: '/account',                   component: UserAccount},

  {name:'about',                path: '/about',                     component: About},
  {name:'leaderboard',          path: '/leaderboard',               component: Leaderboard},

  {name:'posts',                path: '/archives',                  component: PostList},
  {name:'posts.domain',         path: '/domain/:domain',            component: PostList},
  {name:'posts.category',       path: '/category/:categorySlug/:categoryId',  component: PostList},
  {name:'posts.date',           path: '/date/:date',                component: PostList},
  {name:'posts.submit',         path: '/submit',                    component: PostSubmit},
  {name:'posts.thanks',         path: '/submit/thanks',             component: PostThanks},

  {name:'categories',           path: '/categories',                component: CategoryList}, // index route
  // {name:'users.single',   path:'users/:slug',           componentName: 'UsersSingle'},
  // {name:'users.account',  path:'account',               componentName: 'UsersAccount'},
  // {name:'users.edit',     path:'users/:slug/edit',      componentName: 'UsersAccount'},
  // {name:'about',                path: '/about',                     component: () => <SbPage name="about" title="About" packageName="sidebar2017" path="lib/assets/markdown/about.md"/>},
  // {name:'guidelines',           path: '/guidelines',                component: () => <SbPage name="guidelines" title="Guidelines" packageName="sidebar2017" path="lib/assets/markdown/guidelines.md"/>},

  // {name:'usersJobs',            path: '/my-jobs',                   componentName: 'UsersJobs'},
  // {name:'jobs',                 path: '/jobs',                      componentName: 'JobsHome'},
  // {name:'jobsPage',             path: '/post-job',                  componentName: 'JobsPage'},

  // {name:'sponsorPickDate',      path: '/sponsor/new',               componentName: 'SponsorPickDate'},
  {name:'sponsor',              path: '/sponsor/',                    component: SponsorLanding},
  {name:'sponsor.submit',       path: '/sponsor/submit/:code?',             component: SponsorSubmit},
  {name:'sponsor.checkout',     path: '/sponsor/checkout/:postId',   component: SponsorCheckout},
  {name:'sponsor.thanks',       path: '/sponsor/thanks/:postId',     component: SponsorThanks},

  // // {name:'sponsorPickDate',      path: '/sponsor/date/:postId',      componentName: 'SponsorPickDate'},
  // {name:'sponsorPay',           path: '/sponsor/pay/:postId',       componentName: 'SponsorPay'},

  {name:'admin.posts',          path: '/admin/posts',                 component: AdminPosts,         layoutComponent: AdminLayout, access: adminAccessOptions },
  {name:'admin.users',          path: '/admin/users',                 component: AdminUsers,         layoutComponent: AdminLayout, access: adminAccessOptions },
  {name:'admin.categories',     path: '/admin/categories',            component: AdminCategories,    layoutComponent: AdminLayout, access: adminAccessOptions },
  {name:'admin.jobs',           path: '/admin/jobs',                  component: AdminJobs,          layoutComponent: AdminLayout, access: adminAccessOptions },
  {name:'admin.newsletters',    path: '/admin/newsletters',           component: AdminNewsletters,   layoutComponent: AdminLayout, access: adminAccessOptions },
  {name:'admin.discounts',      path: '/admin/discounts',             component: AdminDiscounts,     layoutComponent: AdminLayout, access: adminAccessOptions },
  {name:'admin.charges',        path: '/admin/charges',               component: AdminCharges,       layoutComponent: AdminLayout, access: adminAccessOptions },
  {name:'admin.logs',           path: '/admin/logs',                  component: AdminLogs,       layoutComponent: AdminLayout, access: adminAccessOptions },
];

if (Meteor.isDevelopment && getSetting('environment') === 'development') {
  routes.push({name:'admin.emails',         path: '/admin/emails',                componentName: "Emails",        layoutComponent: AdminLayout, access: adminAccessOptions },)
  routes.push({name:'admin.database',       path: '/admin/database',              componentName: "DebugDatabase", layoutComponent: AdminLayout, access: adminAccessOptions },)
}

addRoute(routes);