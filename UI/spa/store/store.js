/* eslint-disable import/extensions */
import request from '../helper/request.js';

const apiUrl = 'https://quick-credit-staging.herokuapp.com/api/v1';


export default class Store {
  static async signup(userData) {
    const data = await request(`${apiUrl}/auth/signup`).post(userData).send();
    return data;
  }
}
