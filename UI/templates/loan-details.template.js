/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
        <div class="page-title">
            <a href="./single-loan.html"><span>Loan <i>{{loanId}}</i></span></a>
            <span class="float-right color-grey">{{status}}</i></span>
        </div>
        <div class="details">
                <div class="form">
                    <div class="input-group">
                            <div class="input-wrapper">
                                    <label for="" class="primary-color">Application Date</label>
                                    <input type="text" value="{{applicationDate}}" disabled>
                            </div>
                            <div class="input-wrapper">
                                    <label for="" class="primary-color">Amount</label>
                                    <input type="text" value="{{loanAmount}}" disabled>
                            </div>
                            <div class="input-wrapper">
                                    <label for="" class="primary-color">Tenor</label>
                                    <input type="text" value="{{loanTenor}}" disabled>
                            </div>
                    </div>
                    <div class="input-group">
                        <div class="input-wrapper">
                                <label for="" class="primary-color">Balance</label>
                                <input type="text" value="{{loanBalance}}" disabled>
                        </div>
                        <div class="input-wrapper">
                                <label for="" class="primary-color">Next Repayment</label>
                                <input type="text" value="{{nextRepayment}}" disabled>
                        </div>
                    </div>
                    {{action}}
            </div>
        </div>
     `;
    
    
  const loanDetails = {
    root: 'loan-details-root',
    classNames: [],
    template: templateHtml
  };
  global.templates['loan-details'] = loanDetails;
})(this);
