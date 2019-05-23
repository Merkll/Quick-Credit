/* eslint-disable object-shorthand */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import View from './view.js';
import TopMenu from '../components/top-menu.component.js';
import Sidebar from '../components/sidebar.component.js';

import { sideBarLinks, topMenuLinks } from '../helper/template.js';


const template = `
<div>
<div id="top-menu-root"></div>
<div class="row">
    <div class="col-2 no-padding sidebar-col">
            <div id="sidebar-root"></div>
    </div>
    <div class="col-9">
            <div class="search-box">
                    <a href="#" class="search-icon"><i class="fas fa-search"></i></a href="#">
                    <form action="">
                        <input type="text" placeholder="Search for anything">
                    </form>
                </div>
        <div class="card-container metric-container">
            <div class="generic-card dashboard-card">                
                <div class="set-size charts-container">
                        <div class="metric">
                            <div class="pie-wrapper progress-50 ">
                                    <span class="label">50<span class="smaller">%</span></span>
                                    <div class="pie">
                                    <div class="left-side half-circle"></div>
                                    <div class="right-side half-circle"></div>
                                    </div>
                                    <div class="shadow"></div>
                            </div>
                            <span class="text">Loan Repayed</span>
                        </div>
                        <div class="metric">
                            <div class="pie-wrapper progress-50 ">
                                    <span class="label">50<span class="smaller">%</span></span>
                                    <div class="pie">
                                    <div class="left-side half-circle"></div>
                                    <div class="right-side half-circle"></div>
                                    </div>
                                    <div class="shadow"></div>
                            </div>
                            <span class="text">User Verified</span>
                        </div>
                </div>
            </div>                  
                <div class="generic-card metric-card">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>2</span>
                    <h3 class="title">Pending Repayments</h3>
                </div>   
                <div class="generic-card metric-card">
                    <i class="fas fa-users"></i>
                    <span>2</span>
                    <h3 class="title">New Users</h3>
                </div>        
        </div>
        <div class="content" id="content">
            <div class="page-title">
                <span>New Loan Applications</span>
            </div>
            
            <div class="card-container" id = "card-container-root"></div>  
            <div class="page-title">
                    <span>New Clients</span>
                </div>
                <div class="card-container" id = "card-container-root"></div>                  
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
  }
  ],
  hooks: {
    data(data) {     
      this.components[0].data = { links: sideBarLinks(), ...data };   
      this.components[1].data = { ...topMenuLinks };
    },
    afterRender: () => {
      // after rendering 

    },
    render: () => {
      // view specific rendering here render all components here
    }

  }
});
