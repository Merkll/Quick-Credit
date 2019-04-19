(function(){
    const templateHtml = `
    <div class="content">
        <div id="loan-details-root">
            
        </div>
        <div class="details">
            <div class="page-title">
                <span>Loan Repayment History </span>
            </div>
            <div class="table-container" id="repayments-root"></div>
        </div>
    </div>
 `;


    const singleLoan = {
        root: 'single-loan-root',
        classNames: [],
        template: templateHtml,
        afterRender: (data = {}) => {
            const { repayments, loanDetails } = data;
            render('repayments', repayments);
            render('loan-details', loanDetails);
        }
    };
    templates['single-loan'] = singleLoan;
}());