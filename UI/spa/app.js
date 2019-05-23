/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import Router from './router.js';
import Dashboard from './views/dashboard.js';
import Home from './views/home.js';
import Application from './views/application.js';
import SingleLoan from './views/single-loans.js';
import Loans from './views/loans.js';
import SingleClient from './views/single-client.js';


Router.addRoute('/dashboard', Dashboard);
Router.addRoute('/home', Home);
Router.addRoute('/loans', Loans);
Router.addRoute('/loan', SingleLoan);
Router.addRoute('/client', SingleClient);
Router.addRoute('/apply', Application);
Router.renderRoute('/home');
