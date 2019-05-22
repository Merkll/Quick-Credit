import { addEventToDomNodelist,  } from './helper/util.js';

export default class Router {
  constructor(routerIdentifier) {
    this.routes = {};
    this.init(routerIdentifier);
  }

  init(routerIdentifier) {
    if (!routerIdentifier) return;
    this.router = document.querySelectorAll(routerIdentifier);
    addEventToDomNodelist('click', this.router, async (event) => {
      event.preventDefault()
      const target = event.target;
      const { path, view } = target.dataset;
      if (!this.routes[path]) this.routes[path] = await import(`./views/${view}.js`);
      this.routes[path].render();
    });
  }

  addRoute(path, view) {
    this.routes[path] = view;
  }
  renderRoute(path) {
    if (this.routes[path]) this.routes[path].render();
  }

}
