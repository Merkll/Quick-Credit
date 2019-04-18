(function(){
    const templateHtml = `
    <div class="table-container">
        <table class="repayment-table">
                <thead>
                <tr>
                    <th>Payment ID</th>
                    <th>Date Paid</th>
                    <th>Amount Paid</th>
                    <th>Loan Balance</th>
                </tr>
                </thead>
                <tbody>
                    {{repayments}}
                </tbody>
        </table>
    </div>
 `;


    const repayments = {
        root: 'repayments-root',
        classNames: [],
        template: templateHtml
    };
    templates['repayments'] = repayments;
}());