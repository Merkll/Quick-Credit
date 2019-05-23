/* eslint-disable object-shorthand */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import View from './view.js';
import TopMenu from '../components/top-menu.component.js';
import Sidebar from '../components/sidebar.component.js';
import Clients from '../components/clients.component.js';
import SiteAction from '../store/store.js';
import { sideBarLinks } from '../helper/template.js';

const template = `
<div>
<div id="top-menu-root"></div>
<div class="row">
    <div class="col-2 no-padding sidebar-col">
            <div id="sidebar-root"></div>
    </div>
    <div class="col-9">
        <div class="content" id="content">
            <div class="page-title">
                <span>Clients</span>
            </div>
            <div class="custom-select filter-form float-right">
                    <form action="" class="filter-form">
                            <select name="" id="">
                                <option value="">All Clients</option>
                                <option value="">Approved Clients</option>
                                <option value="">Pending Approval</option>
                            </select>
                    </form>
                </div>
            <div class="card-container" id = "clients-root"></div>                   
        </div>
    </div>
</div>
<div class="overlay full-overlay">
        <i class="close-btn icon close"></i>
        <div id="single-client-root">

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
    component: Clients,
    data: {}
  },
  ],
  hooks: {
    async data() {
      const user = SiteAction.getUserDetails();
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
      this.components[0].data = { links: sideBarLinks(), ...user };   
      this.components[1].data = { ...topMenuLinks };
      const clients = await SiteAction.getClients();
      this.components[2].data = clients;
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
