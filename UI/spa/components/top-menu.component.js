/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */

import Component from '../helper/component.js'; 

const templateHtml = `
      <div class="menu">
      <a href="./index.html"><span class="logo">Quick Credit</span></a>            
          <nav>
              {{links}}
          </nav>
      </div>
  `;

export default new Component('top-menu', {
  root: 'top-menu-root',
  classNames: [],
  template: templateHtml,
});
