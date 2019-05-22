/* eslint-disable import/extensions */
import View from './view.js';
import TopMenu from '../components/top-menu.component.js';


const template = `
<div>
<div id="top-menu-root"></div>
    <div class="home-bg-image full-height"></div>
        <div class="overlay home-overlay animate-fadein full-height">
            <div class="row to-front">
                    <div class="col-6 offset-3 margin-top-30">
                            <div class="form">
                                <h4 class="heading">Register With Us</h4>
                                <form action="" method="POST" id="signup">
                                        <div class="input-wrapper">
                                            <label for="" class="primary-color">First Name</label>
                                            <input class="required" type="text" name="firstName" placeholder="John" required>
                                        </div>
                                        <div class="input-wrapper">
                                                <label for="" class="primary-color">Last Name</label>
                                                <input class="required" type="text" name="lastName" placeholder="Doe" required>
                                        </div>
                                        <div class="input-group">
                                                <div class="input-wrapper">
                                                        <label for="" class="primary-color">Email</label>
                                                        <input class="required" data-validator="email" type="email" name="email" placeholder="johnDe@example.com" required>
                                                </div>
                                                <div class="input-wrapper">
                                                        <label for="" class="primary-color">Mobile</label>
                                                        <input class="required" data-validator="phone" type="text" name="mobile" placeholder="+2348132255421" required>
                                                </div>
                                        </div>
                                        <div class="input-group">
                                            <div class="input-wrapper">
                                                    <label for="" class="primary-color">Password </label>
                                                    <input class="required" type="password" data-validator="password" name="password" placeholder="********" required>
                                                </div>
                                            <div class="input-wrapper">
                                                    <label for="" class="primary-color">Confirm Password</label>
                                                    <input class="required" type="password" name="passwordConfirm" placeholder="********" required>
                                            </div>
                                        </div>
                                        <div class="input-wrapper">
                                                <label for="" class="primary-color">Contact Address</label>
                                                <input class="required" type="text" name="address" placeholder="address" required>
                                        </div>
                                        <div class="input-wrapper">
                                                <button class="btn login-btn" type="submit">Register</button>
                                        </div>
                                        <span class="primary-color size-16">Already Have an account? <a href="./index.html" class="router" data-path="/home", data-view="home"> Login here</a></span>
                                    </form>
                            </div>
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
