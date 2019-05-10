/**
 * A generic http response for the application
 */
export default class {
  constructor(data, status = 200) {
    this.status = status;
    this.data = data;
  }
}
