/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
    <div class="content">
        <div id="loan-details-root">
            
        </div>
        <div class="details">
            <div class="page-title">
                <span>Loan Repayment History </span>
            </div>
            <div class="table-container" id="repayments-root"></div>
            <button class="btn close-btn margin-20">Ok</button>
        </div>
    </div>
 `;


  const singleLoan = {
    root: 'single-loan-root',
    classNames: [],
    template: templateHtml,
    afterRender: (data = {}, render) => {
      const { repayments, loanDetails } = data;
      render('repayments', repayments);
      render('loan-details', loanDetails);
    }
  };
  global.templates['single-loan'] = singleLoan;
})(this);
