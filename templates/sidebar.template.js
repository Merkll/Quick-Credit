(function(){
    const templateHtml = `
    <a href="" class="sidebar-icon"> <i class="icon trigram"></i></a>
    <a href="" class="sidebar-icon hide"> <i class="icon close"></i></a>

        <div class="sidebar">
            <span class="account-name">Hi, {{accountName}}</span>
            <a href="./loans.html">Loans</a>
            <a href="./application.html">Apply</a>
            <a href="./inbox.html">Inbox <i>({{inboxCount}})</i></a>
        </div>
    `;


    const sidebarTemplate = {
        root: 'sidebar-root',
        classNames: [],
        template: templateHtml
    }
    templates['sidebar'] = sidebarTemplate;
}());