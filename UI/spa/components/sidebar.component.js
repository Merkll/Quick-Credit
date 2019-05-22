/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */

import Component from '../helper/component.js'; 

const templateHtml = `
<a href="" class="sidebar-icon"> <i class="icon trigram"></i></a>
<a href="" class="sidebar-icon hide"> <i class="icon close"></i></a>

    <div class="sidebar">
        <span class="account-name">Hi, {{firstname}}</span>
        {{links}}
    </div>
`;

export default new Component('sidebar', {
  root: 'sidebar-root',
  classNames: [],
  template: templateHtml
});
