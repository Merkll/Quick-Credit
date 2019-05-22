const scripts = '../helper/quick-credit.js';

export default class View {
  constructor({
    elem, template, components, hooks = {} 
  }) {
    this.hooks = hooks;
    this.template = template;
    this.components = components;
    this.elemSelector = elem;
    this.elem = document.querySelector(elem);
  }

  getElem() {
    return this.elem ? this.elem : document.querySelector(this.elemSelector);
  }

  addHook(hook, handler) {
    this.hooks[hook] = handler;
    return this;
  }

  trigerHook(hook, data) {
    const hookHandler = this.hooks[hook];
    if (typeof hookHandler === 'function') return hookHandler.bind(this)(data);
    return data;
  }

  async renderComponents() {
    if (!Array.isArray(this.components)) return null;
    const components = this.components.map(({ component, data }) => component.render(data));
    return Promise.all(components);
  }

  async render() {
    const data = this.trigerHook('data') || this.template;
    const populatedTemplate = this.trigerHook('populate', data);
    this.populatedTemplate = populatedTemplate;
    const templateElement = document.createElement('template');
    templateElement.innerHTML = populatedTemplate;
    const templateNode = templateElement.content || templateElement.content.childNodes[0];
    const rootElement = this.getElem();
    if (rootElement) {
      // eslint-disable-next-line no-unused-expressions
      rootElement.firstChild ? rootElement.removeChild(rootElement.firstChild) : '';
      rootElement.appendChild(templateNode);
      const renderData = await this.renderComponents(); 
      await import(scripts); 
    }
    this.trigerHook('render', data);
    this.trigerHook('afterRender', data);
  }
}
