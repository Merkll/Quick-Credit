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
        <div class="content">
            <div class="page-title">
                <span>Loan Application</span>
            </div>
                <div class="form application-form">
                    <form action="" method="POST" id="apply">
                        <div class="input-group">
                                <div class="input-wrapper">
                                        <label for="" class="primary-color">Amount</label>
                                        <input class="required" type="text" name="amount" data-validator="amount" placeholder="10000" required>
                                </div>
                                <div class="input-wrapper">
                                        <label for="" class="primary-color">Tenor</label>
                                        <input class="required" type="text" name="tenor" data-validator="number" placeholder="12" required>
                                </div>
                        </div>
                        <div class="input-wrapper">
                                <label for="" class="primary-color">Purpose</label>
                                <input class="required" type="text" name="Purpose" placeholder="purpose" required>
                        </div>
                        <div class="input-wrapper">
                            <button class="btn login-btn" type="submit">Apply</button>
                        </div>
                        <!-- <span><a href="#login" > Calculate Our Rates Here</a></span> -->
                    </form>
            </div>                  
        </div>
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
