/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
    <div class="card">
        <div class="card-header">
        <a href="./single-loan.html"><span>Loan: {{loanId}}</span></a>
            <span>{{loanStatus}}</span>
        </div>
        <div class="card-content">
            <span>Application Date <i>{{applicationDate}}</i></span>
            <span>Loan Amount <i>{{loanAmount}}</i></span>
            <span>Loan Tenor <i>{{loanTenor}}</i></span>
            <span>Balance <i>{{loanBalance}}</i></span>
            <span>Next Repayment <i>{{nextRepayment}} </i></span>
            <a href="#" data-loan="{{loanId}}" class="view-loan">View Loan</a>
        </div>
    </div>
 `;


  const loansCard = {
    root: 'loans-card-root',
    classNames: [],
    template: templateHtml
  };
  global.templates['loans-card'] = loansCard;
})(this);
