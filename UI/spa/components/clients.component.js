/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */

import Component from '../helper/component.js'; 
import { generateMultiFromTemplate, replaceTag } from '../helper/render.js';
import SiteAction from '../store/store.js';

const clientCardTemplate = `
<div class="card">
<div class="card-header">
<a href="#" class="router" data-path="/client" data-view="single-client" data-email="{{email}}"><span>Client: {{id}}</span></a>
    <span class="{{status}}" data-client="{{id}}">{{status}}</span>
</div>
<div class="card-content">
    <span>Date Joined <i>{{createdon}}</i></span>
    <span>Email <i>{{email}}</i></span>
    <a href="#" data-client="{{id}}"  data-email="{{email}}" class="view-client">View Client</a>
    {{approveButton}}
</div>
</div>
`;

const templateHtml = `
<div class="card-container">
    {{cards}}
</div> 
`;

export default new Component('clients', {
  root: 'clients-root',
  classNames: [],
  template: templateHtml,
  childComponent: 'loansCard',
  childTag: 'cards',
}, (data) => {
  const { isadmin } = SiteAction.getUserDetails();
  const approveTemplate = '<a href="#" data-client="{{id}}" class="client-action" data-action="approve">Approve Client</a>';
  const template = generateMultiFromTemplate(clientCardTemplate, data, (loan, clienttemplate) => {
    if (isadmin && loan.status !== 'verified') return replaceTag(clienttemplate, 'approveButton', approveTemplate);
    return clienttemplate;
  }) || 'No Loans available';
  document.getElementById('clients-root').innerHTML = template;
});
