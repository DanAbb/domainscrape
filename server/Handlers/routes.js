/* @flow */

import LoginRoutes from './Login';
import SignupRoutes from './Signup';
import ScrapeRoutes from './Scrape';

const routes = [
  ...LoginRoutes,
  ...SignupRoutes,
  ...ScrapeRoutes
];

export default routes;
