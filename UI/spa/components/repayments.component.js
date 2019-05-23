/* eslint-disable no-param-reassign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-param-reassign */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */

import Component from '../helper/component.js';
import { generateMultiFromTemplate, replaceTag, replaceTrailingTags } from '../helper/render.js';

const repaymentRows = `
<tr>
    <td>{{id}}</td>
    <td>{{createdon}}</td>
    <td>{{amount}}</td>
</tr>
`;
const templateHtml = `
<div class="table-container">
    <table class="repayment-table">
            <thead>
            <tr>
                <th>Payment ID</th>
                <th>Date Paid</th>
                <th>Amount Paid</th>
            </tr>
            </thead>
            <tbody>
                {{repayments}}
            </tbody>
    </table>
</div>
`;

export default new Component('repayments', {
  root: 'repayments-root',
  classNames: [],
  template: templateHtml,
}, (data) => {
  const template = generateMultiFromTemplate(repaymentRows, data) || 'No Loan repayment yet';
  const repaymentTemplate = replaceTrailingTags(replaceTag(templateHtml, 'repayments', template)); 
  document.getElementById('repayments-root').innerHTML = repaymentTemplate;
});
