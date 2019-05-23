/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */

import Component from '../helper/component.js'; 
import { generateMultiFromTemplate, replaceTag } from '../helper/render.js';
import SiteAction from '../store/store.js';

const loanCardTemplate = `
<div class="card">
<div class="card-header">
<a href="#" class="router" data-path="/loan" data-view="single-loan" data-loanId="{{id}}"><span>Loan: {{id}}</span></a>
    <span class="loan-status" data-loan="{{id}}">{{status}}</span>
</div>
<div class="card-content">
    <span>Application Date <i>{{createdon}}</i></span>
    <span>Loan Amount <i>{{amount}}</i></span>
    <span>Loan Tenor <i>{{tenor}}</i></span>
    <span>Balance <i>{{balance}}</i></span>
    <span>Payment Installment <i>{{paymentinstallment}}</i></span>
    <span>Next Repayment <i>{{nextRepayment}} </i></span>
    <a href="#" data-loan="{{id}}" class="view-loan">View Loan</a>
    {{repaymentButton}}
</div>
</div>
`;

const templateHtml = `
<div class="card-container">
    {{cards}}
</div> 
`;

export default new Component('cardContainer', {
  root: 'loans-root',
  classNames: [],
  template: templateHtml,
  childComponent: 'loansCard',
  childTag: 'cards',
}, (data) => {
  const { isadmin } = SiteAction.getUserDetails();
  const repaymentTemplate = '<a href="#" data-loan="{{id}}" class="loan-repayment" data-action="Repayment">Post Repayment</a>';
  const template = generateMultiFromTemplate(loanCardTemplate, data, (loan, loantemplate) => {
    if (isadmin && loan.status === 'approved') return replaceTag(loantemplate, 'repaymentButton', repaymentTemplate);
    return loantemplate;
  }) || 'No Loans available';
  document.getElementById('loans-root').innerHTML = template;
});
