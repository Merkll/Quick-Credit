/* eslint-disable object-shorthand */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import View from './view.js';
import TopMenu from '../components/top-menu.component.js';
import Sidebar from '../components/sidebar.component.js';
import SingleLoan from '../components/single-loan.component.js';
import Repayments from '../components/repayments.component.js';
import SiteAction from '../store/store.js';
import { sideBarLinks, topMenuLinks } from '../helper/template.js';


const template = `
<div class="content" id="content">
    <div id="single-loan-root">
        
    </div>
    <div class="details">
        <div class="page-title">
            <span>Loan Repayment History </span>
        </div>
        <div class="table-container" id="repayments-root"></div>
        <button class="btn close-btn margin-20">Ok</button>
    </div>
</div>
`;


export default new View({
  elem: '#single-loan',
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
    component: SingleLoan,
    data: {}
  },
  {
    component: Repayments,
    data: {}
  },
  ],
  hooks: {
    async data(data) {
      const { loanid: loanId } = data;
      const user = SiteAction.getUserDetails();
      this.components[0].data = { links: sideBarLinks(), ...user };   
      this.components[1].data = { ...topMenuLinks };
      const { loan, repayments } = await SiteAction.getLoan(loanId);
      this.components[2].data = loan;
      this.components[3].data = repayments;
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
