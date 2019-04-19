(function(){
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
        afterRender: (data = {}) => {
            const { clientDetails = {}, clientLoans = {} } = data;
            console.trace(clientDetails);
            clientLoans['root'] = 'clients-loans-root';
            render('client-details', clientDetails);
            render('card-container', clientLoans);
        }
    };
    templates['single-client'] = singleClient;
}());