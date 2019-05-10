/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
        <div class="content">
            <div id="client-details-root">
                
            </div>
            <div class="details">
                <div class="page-title">
                    <span>User Loans</span>
                </div>
                <div class="table-container" id="clients-loans-root"></div>
            </div>
        </div>
    `;
  const singleClient = {
    root: 'single-client-root',
    classNames: [],
    template: templateHtml,
    afterRender: (data = {}, render) => {
      const { clientDetails = {}, clientLoans = {} } = data;
      clientLoans.root = 'clients-loans-root';
      render('client-details', clientDetails);
      render('card-container', clientLoans);
    }
  };
  global.templates['single-client'] = singleClient;
})(this);
