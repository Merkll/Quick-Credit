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
<a href="#"><span>Loan <i>{{id}}</i></span></a>
<span class="float-right color-grey loan-status {{status}}" data-loan="{{id}}">{{status}}</i></span>
</div>
<div class="details">
<div class="form">
        <div class="input-group">
                <div class="input-wrapper">
                        <label for="" class="primary-color">Application Date</label>
                        <input type="text" value="{{createdon}}" disabled>
                </div>
                <div class="input-wrapper">
                        <label for="" class="primary-color">Amount</label>
                        <input type="text" value="{{amount}}" disabled>
                </div>
                <div class="input-wrapper">
                        <label for="" class="primary-color">Tenor</label>
                        <input type="text" value="{{tenor}}" disabled>
                </div>
        </div>
        <div class="input-group">
        <div class="input-wrapper">
                <label for="" class="primary-color">Balance</label>
                <input type="text" value="{{balance}}" disabled>
        </div>
        <div class="input-wrapper">
                <label for="" class="primary-color">Monthly Installment</label>
                <input type="text" value="{{paymentinstallment}}" disabled>
        </div>
        </div>
        {{action}}
</div>
</div>
`;

export default new Component('single-loan', {
  root: 'single-loan-root',
  classNames: [],
  template: templateHtml,
}, (data) => {
  let template = mapStringReplace(templateHtml, data, true) || 'Loan details not available';
  const { status, id } = data;
  const { isadmin } = SiteAction.getUserDetails();
  const approveBtn = `<button class="btn float-right overlay-btn loan-action" data-action="approved" data-loan="${id}">Approve Loan</button>`;
  const rejectBtn = `<button class="btn float-right overlay-btn loan-action" data-action="rejected"  data-loan="${id}">Reject Loan</button>`;
  const repaymentBtn = `<button class="btn float-right overlay-btn loan-repayment" data-action="repayment" data-loan="${id}">Post Repayment</button>`;

  if (isadmin && (status === 'pending' || !status)) {
    template = replaceTrailingTags(replaceTag(template, 'action', `${approveBtn}${rejectBtn}`));
  } else if (isadmin && status === 'approved') {
    template = replaceTrailingTags(replaceTag(template, 'action', `${repaymentBtn}`));
  } else {
    template = replaceTrailingTags(template);
  }
  document.getElementById('single-loan-root').innerHTML = template;
});
