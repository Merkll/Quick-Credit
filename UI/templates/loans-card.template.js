(function(){
    const templateHtml = `
    <div class="card">
        <div class="card-header">
            <span>Loan: {{loanId}}</span>
            <span>{{loanStatus}}</span>
        </div>
        <div class="card-content">
            <span>Application Date <i>{{applicationDate}}</i></span>
            <span>Loan Amount <i>{{loanAmount}}</i></span>
            <span>Loan Tenor <i>{{loanTenor}}</i></span>
            <span>Balance <i>{{balance}}</i></span>
            <span>Next Repayment <i>{{nextRepayment}} </i></span>
            <a href="#" data-loan="{{loanId}}">View Loan</a>
        </div>
    </div>
 `;


    const loansCard = {
        root: 'loans-card-root',
        classNames: [],
        template: templateHtml
    };
    templates['loans-card'] = loansCard;
}());