/* eslint-disable no-param-reassign */
((global) => {
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
            <a href="#" data-client="{{userId}}" class="client-action" data-action="approve">Approve Client</a>
        </div>
    </div>
 `;


  const clientsCard = {
    root: 'clients-card-root',
    classNames: [],
    template: templateHtml
  };
  global.templates['clients-card'] = clientsCard;
})(this);
