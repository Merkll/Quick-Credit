/* eslint-disable object-shorthand */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import View from './view.js';
import TopMenu from '../components/top-menu.component.js';
import Sidebar from '../components/sidebar.component.js';
import Loans from '../components/loans.component.js';
import SiteAction from '../store/store.js';
import { sideBarLinks, topMenuLinks } from '../helper/template.js';

const template = `
<div>
<div id="top-menu-root"></div>
<div class="row">
    <div class="col-2 no-padding sidebar-col">
            <div id="sidebar-root"></div>
    </div>
    <div class="col-10">
        <div class="content" id="content">
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
    async data() {
      const user = SiteAction.getUserDetails();
      this.components[0].data = { links: sideBarLinks(), ...user };   
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
