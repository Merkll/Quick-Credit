/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import Router from './router.js';
import Dashboard from './views/dashboard.js';
import UI from './views/ui.js';
import Home from './views/home.js';

const router = new Router('.router');

router.addRoute('/', Dashboard);
router.addRoute('/ui', UI);
router.addRoute('/home', Home);

// console.log(router.renderRoute('/'));
// console.log(UI)
// console.log(router.renderRoute('/ui'));
console.log(router.renderRoute('/home'));
// console.log(window.location)
