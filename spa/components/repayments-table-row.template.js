/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
    <tr>
        <td>{{paymentId}}</td>
        <td>{{paymentDate}}</td>
        <td>{{paymentAmount}}</td>
        <td>{{balance}}</td>
    </tr>
 `;


  const repaymentsTableRow = {
    root: 'repayments-table-row-root',
    classNames: [],
    template: templateHtml
  };
  global.templates['repayments-table-row'] = repaymentsTableRow;
})(this);
