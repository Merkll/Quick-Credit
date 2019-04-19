(function(){
    const templateHtml = `
    <div class="card">
        <div class="card-header">
            <span>Client: {{userId}}</span>
            <span>{{status}}</span>
        </div>
        <div class="card-content">
            <span>Date Joined <i>{{userJoinedDate}}</i></span>
            <span>Email <i>{{userEmail}}</i></span>
            <span>Loans <i>{{userLoans}}</i></span>
            <a href="#" data-client="{{userId}}" class="view-client">View Client</a>
        </div>
    </div>
 `;


    const clientsCard = {
        root: 'clients-card-root',
        classNames: [],
        template: templateHtml
    };
    templates['clients-card'] = clientsCard;
}());