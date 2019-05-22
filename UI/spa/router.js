import { addEventToDomNodelist,  } from './helper/util.js';

class Router {
  constructor(routerIdentifier) {
    this.routes = {};
    this.routerIdentifier = routerIdentifier;
    this.init();
  }

  init() {
    if (!this.routerIdentifier) return;
    this.router = document.querySelectorAll(this.routerIdentifier);
    addEventToDomNodelist('click', this.router, async (event) => {
      event.preventDefault()
      const target = event.target;
      const { path, view } = target.dataset;
      if (!this.routes[path]) this.routes[path] = (await import(`./views/${view}.js`)).default;
      this.renderRoute(path);
    });
  }

  addRoute(path, view) {
    this.routes[path] = view;
  }
  async renderRoute(path, data) {
    if (this.routes[path]) await this.routes[path].render(data);
    this.init();
  }

}

export default new Router('.router');

