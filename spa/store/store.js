/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
import request from '../helper/request.js';
import { render } from '../helper/render.js';
import { validateFormFields } from '../helper/util.js';
import Router from '../router.js';

const apiUrl = 'http://localhost:5000/api/v1';

const getAuthHeader = () => {
  const token = SiteAction.getAuthToken();
  return { Authorization: token };
}; 

export default class SiteAction {
  static saveAuthToken(token) {
    window.localStorage.setItem('token', token);
    return token;
  }


  static saveUserDetails(user) {
    window.localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  static getUserDetails() {
    const user = window.localStorage.getItem('user');
    return JSON.parse(user);
  }

  static getAuthToken() {
    return window.localStorage.getItem('token');
  }

  static async signup(formData, form) {
    formData.get('email');
    const { messages } = validateFormFields(formData, form);
    if (messages) {
      return render('alert', { content: `${messages.join('</br>')}`, classes: 'bg-red' });
    }
    const { error, data } = await request(`${apiUrl}/auth/signup`).post(formData).send();
    if (error) return render('alert', { content: `${Array.isArray(error) ? error.join('</br>') : error}`, classes: 'bg-red' });
    const { 
      token, firstname, id, isadmin 
    } = data;
    SiteAction.saveAuthToken(token); 
    render('alert', { content: `Welcome ${firstname}` });
    if (isadmin) Router.renderRoute('/dashboard', SiteAction.saveUserDetails({ firstname, id, isadmin }));
    else Router.renderRoute('/loans', SiteAction.saveUserDetails({ firstname, id, isadmin }));

    return data;
  }

  static async login(formData, form) {
    const valid = validateFormFields(formData, form);
    if (valid.messages) return render('alert', { content: `${valid.messages.join('</br>')}`, classes: 'bg-red' });
    const { error, data } = await request(`${apiUrl}/auth/signin`).post(formData).send();
    if (error) return render('alert', { content: `${error}`, classes: 'bg-red' });
    const { 
      token, firstname, id, isadmin 
    } = data;
    SiteAction.saveAuthToken(token);    
    render('alert', { content: `Welcome ${firstname}` });
    if (isadmin) {
      Router.renderRoute('/dashboard', SiteAction.saveUserDetails({ firstname, id, isadmin }));
    } else {
      Router.renderRoute('/loans', SiteAction.saveUserDetails({ firstname, id, isadmin }))
    }
    return data;
  }

  static async getLoans() {
    const { error, data } = await request(`${apiUrl}/loans`, {
      ...getAuthHeader()
    }).get().send();
    if (error) return render('alert', { content: `${error}`, classes: 'bg-red' });
    return data;
  }

  static async getClients() {
    const { error, data } = await request(`${apiUrl}/users`, {
      ...getAuthHeader()
    }).get().send();
    if (error) return render('alert', { content: `${error}`, classes: 'bg-red' });
    return data;
  }

  static async getClient(client) {
    const { error, data } = await request(`${apiUrl}/users/${client}`, {
      ...getAuthHeader()
    }).get().send();
    if (error) return render('alert', { content: `${error}`, classes: 'bg-red' });
    return data;
  }

  static async getLoan(loanId) {
    const { error, data } = await request(`${apiUrl}/loans/${loanId}`, {
      ...getAuthHeader()
    }).get().send();
    if (error) return render('alert', { content: `${error}`, classes: 'bg-red' });
    const { data: repaymentData = [] } = await request(`${apiUrl}/loans/${loanId}/repayments`, {
      ...getAuthHeader()
    }).get().send();
    return { loan: data, repayments: repaymentData };
  }

  static async changeLoanStatus(loanDetails) {
    const { loan, action } = loanDetails;
    const { error, data } = await request(`${apiUrl}/loans/${loan}`, {
      ...getAuthHeader()
    }).patch({ status: action }).send();
    if (error) return render('alert', { content: `${error}`, classes: 'bg-red' });
    return { loan: data, message: `Loan succesfully ${action}` };
  }

  static async postRepayment(loanDetails) {
    const { loan } = loanDetails;
    const { error, data } = await request(`${apiUrl}/loans/${loan}/repayments`, {
      ...getAuthHeader()
    }).post().send();
    if (error) return render('alert', { content: `${error}`, classes: 'bg-red' });
    return { loan: data, message: 'Loan Repayment succesfull' };
  }
}
