/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
    <a href="" class="sidebar-icon"> <i class="icon trigram"></i></a>
    <a href="" class="sidebar-icon hide"> <i class="icon close"></i></a>

        <div class="sidebar">
            <span class="account-name">Hi, {{accountName}}</span>
            {{links}}
        </div>
    `;


  const sidebarTemplate = {
    root: 'sidebar-root',
    classNames: [],
    template: templateHtml
  };
  global.templates.sidebar = sidebarTemplate;
})(this);
