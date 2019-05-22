/* eslint-disable object-shorthand */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import View from './view.js';
import TopMenu from '../components/top-menu.component.js';
import Sidebar from '../components/sidebar.component.js';
import Loans from '../components/loans.component.js';
import SiteAction from '../store/store.js';


const template = `
<div>
<div id="top-menu-root"></div>
<div class="row">
    <div class="col-2 no-padding sidebar-col">
            <div id="sidebar-root"></div>
    </div>
    <div class="col-9">
        <div class="content">
            <div class="page-title">
                <span>Loans</span>
            </div>
            <div class="card-container" id = "loans-root"></div>                   
        </div>
    </div>
</div>
<div class="overlay full-overlay">
        <i class="close-btn icon close"></i>
        <div id="single-loan-root">

        </div>
</div>
</div>`;

export default new View({
  elem: '#app',
  template,
  components: [{
    component: Sidebar,
    data: {}
  },
  {
    component: TopMenu,
    data: {}
  },
  {
    component: Loans,
    data: {}
  },
  ],
  hooks: {
    async data(data) {
      const user = SiteAction.getUserDetails();
      const { isadmin } = user;
      const topMenuLinks = {
        childTag: 'links',
        childComponent: { type: 'literal', data: '<a href="{{href}}">{{text}}</a>' },
        childNodes: [
          {
            text: 'Logout',
            href: './home.html',
          }
        ]
      };
      const sideBarlinks = {
        client: {
          childTag: 'links',
          childComponent: { type: 'literal', data: '<a href="{{href}}" class="router" data-path="{{path}}" data-view="{{view}}">{{text}}</a>' },
          childNodes: [
            {
              text: 'Loans',
              href: './loans.html',
              path: '/loans',
              view: 'loans'
            },
            {
              text: 'Apply',
              href: './application.html',
              path: '/apply',
              view: 'application'
            },
            {
              text: 'Profile',
              href: './single-client.html',
              path: '/profile',
              view: 'single-client'
            }
          ]
        },
        admin: {
          childTag: 'links',
          childComponent: { type: 'literal', data: '<a href="{{href}}" class="router" data-path="{{path}}" data-view="{{view}}">{{text}}</a>' },
          childNodes: [
            {
              text: 'Dashboard',
              href: './dashboard.html',
              class: 'active'
            },
            {
              text: 'Loans',
              href: './admin-loans.html',
              path: '/loans',
              view: 'loans'
            },
            {
              text: 'Clients',
              href: './admin-clients.html',
            }
          ]
        }
      };
      const mode = isadmin ? 'admin' : 'client';
      this.components[0].data = { links: sideBarlinks[mode], ...user };   
      this.components[1].data = { ...topMenuLinks };
      const loans = await SiteAction.getLoans();
      this.components[2].data = loans;
      return template;
    },
    afterRender: () => {
      // after rendering 

    },
    render: () => {
      // view specific rendering here render all components here
    }

  }
});
