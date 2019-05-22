/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import Router from './router.js';
import Dashboard from './views/dashboard.js';
import Home from './views/home.js';

Router.addRoute('/dashboard', Dashboard);
Router.addRoute('/home', Home);
Router.renderRoute('/home');
