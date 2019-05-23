/* eslint-disable object-shorthand */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import View from './view.js';
import TopMenu from '../components/top-menu.component.js';
import Sidebar from '../components/sidebar.component.js';
import SingleClient from '../components/single-client.component.js';
// import Repayments from '../components/repayments.component.js';
import SiteAction from '../store/store.js';
import { sideBarLinks, topMenuLinks } from '../helper/template.js';


const template = `
<div class="content" id="content">
    <div id="single-client-root">
        
    </div>
    <div class="details">
        <div class="table-container" id="repayments-root"></div>
        <button class="btn close-btn margin-20">Ok</button>
    </div>
</div>
`;


export default new View({
  elem: '#single-client',
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
    component: SingleClient,
    data: {}
  },
  // {
  //   component: Repayments,
  //   data: {}
  // },
  ],
  hooks: {
    async data(data) {
      const { email } = data;
      const user = SiteAction.getUserDetails();
      this.components[0].data = { links: sideBarLinks(), ...user };   
      this.components[1].data = { ...topMenuLinks };
      const clientDetails = await SiteAction.getClient(email);
      this.components[2].data = clientDetails;
      // this.components[3].data = repayments;
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
