/* eslint-disable no-param-reassign */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */

import Component from '../helper/component.js'; 
import { mapStringReplace, replaceTag, replaceTrailingTags } from '../helper/render.js';
import SiteAction from '../store/store.js';

const templateHtml = `
        <div class="page-title">
        <a href="./single-client.html"><span>Client <i>{{userId}}</i></span></a>
        <span class="float-right color-grey">{{status}}</i></span>
        </div>
        <div class="details">
        <div class="form">
                <div class="input-group">
                        <div class="input-wrapper">
                                <label for="" class="primary-color">First Name</label>
                                <input type="text" value="{{firstname}}" disabled>
                        </div>
                        <div class="input-wrapper">
                                <label for="" class="primary-color">Last Name</label>
                                <input type="text" value="{{lastname}}" disabled>
                        </div>
                </div>
                <div class="input-group">
                <div class="input-wrapper">
                        <label for="" class="primary-color">Email</label>
                        <input type="text" value="{{email}}" disabled>
                </div>
                <div class="input-wrapper">
                        <label for="" class="primary-color">Mobile</label>
                        <input type="text" value="{{mobile}}" disabled>
                </div>
                </div>
                <div class="input-wrapper">
                        <label for="" class="primary-color">Address</label>
                        <input type="text" value="{{address}}" disabled>
                </div>
                {{action}}
        </div>
        </div>
`;

export default new Component('single-client', {
  root: 'single-client-root',
  classNames: [],
  template: templateHtml,
}, (data) => {
  let template = mapStringReplace(templateHtml, data, true) || 'Loan details not available';
  const { status, id } = data;
  const { isadmin } = SiteAction.getUserDetails();
  const approveBtn = `<button class="btn float-right overlay-btn client-action" data-action="verify" data-loan="${id}">Approve Client</button>`;

  if (isadmin && (status === 'unverified' || !status)) {
    template = replaceTrailingTags(replaceTag(template, 'action', `${approveBtn}`));
  } else {
    template = replaceTrailingTags(template);
  }
  document.getElementById('single-client-root').innerHTML = template;
});
