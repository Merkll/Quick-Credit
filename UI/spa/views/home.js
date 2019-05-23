/* eslint-disable import/extensions */
import View from './view.js';
import TopMenu from '../components/top-menu.component.js';


const template = `
<div>
  <div id="top-menu-root"></div>
  <div class="waveContainer waveAnimation">
          <div class="overlay-text">
                  <h2> Get instant loans stress free. </h2></br>
                  <h3>All in 15 mins With the NO. 1 credit Provider </h3>
                  
              </div>
      <div class="home-bg-image"></div>
          <div class="overlay home-overlay animate-fadein">
              <div class="row to-front">
                  <!-- <div class="overlay-text">
                      Get instant loans stress free. All in 15 mins With the NO. 1 credit Provider
                  </div> -->
                  <div class="offset-2 col-8">
                      <div class="form login-form">
                              <h4 class="heading">User Login</h4>
                              <form action="" id="login">
                                  <div class="input-wrapper">
                                      <label for="email">Email</label>
                                      <input type="email" name="email" data-validator="email" required>
                                  </div>
                                  <div class="input-wrapper">
                                      <label for="">Password</label>
                                      <input type="password" name="password" data-validator="password" required>
                                  </div>
                                  <button class="btn primary-bg-color primary-color home-btn" type="submit"> Login</button>
                                  <span class="primary-color size-16"><a href="./signup.html" class="color-white router" data-path="/signup" data-view="signup">Signup here</a></span>
                              </br>
                                  <span class="primary-color size-16"><a href="./password-reset.html" class="color-white">Reset Password</a></span>
                              </form>
                      </div>
                  </div>
              </div>
          </div>
          <div class="waveContainerInner bgTop">
            <div class="wave waveTop"></div>
          </div>
          <div class="waveContainerInner bgMiddle">
            <div class="wave waveMiddle"></div>
          </div>
          <div class="waveContainerInner bgBottom">
            <div class="wave waveBottom"></div>
          </div>
  </div>
  <div class="banner">
          <p class="banner-text">Why choose us?</p>
          <div class="inner">
                  <div>
                      <img src="./assets/images/undraw_discount_d4bd.svg" alt="" srcset="">
                      <p class="img-text">Low Interest</p>
                  </div>
                  <div>
                      <img src="./assets/images/undraw_in_no_time_6igu.svg" alt="" srcset="">
                      <p class="img-text">Quick Loan Disbursement</p>
                  </div>
                  <div>
                      <img src="./assets/images/undraw_happy_feeling_slmw.svg" alt="" srcset="">
                      <p class="img-text">Happy Customers</p>
              </div>
          </div>
  </div>
  </div>
`;

export default new View({
  elem: '#app',
  template,
  components: [{
    component: TopMenu,
    data: {}
  }],
  hooks: {
    afterRender: () => {
      // after rendering 

    },
    render: () => {
      // view specific rendering here render all components here
    }

  }
});
