/* eslint-disable import/named */
/* eslint-disable import/extensions */
import { onViewLoaded } from '../helper/quick-credit.js';
import { activateTemplateLoader, deactivateTemplateLoader } from '../helper/render.js';

const removeAllChildren = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  return node;
};
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
    const containerElement = this.elem ? this.elem : document.querySelector(this.elemSelector);
    return containerElement || document.querySelector('#content');
  }

  addHook(hook, handler) {
    this.hooks[hook] = handler;
    return this;
  }

  trigerHook(hook, data) {
    const hookHandler = this.hooks[hook];
    if (typeof hookHandler === 'function') return hookHandler.bind(this)(data);
    return (data && data.view) ? null : data;
  }

  async renderComponents() {
    if (!Array.isArray(this.components)) return null;
    const components = this.components.map(({ component, data }) => component.render(data));
    const renderedComponent = await Promise.all(components);
    return renderedComponent;
  }

  async render(viewData) {
    activateTemplateLoader();
    const data = await this.trigerHook('data', viewData) || this.template;
    const populatedTemplate = await this.trigerHook('populate', data);
    this.populatedTemplate = populatedTemplate;
    const templateElement = document.createElement('template');
    templateElement.innerHTML = populatedTemplate;
    const templateNode = templateElement.content || templateElement.content.childNodes[0];
    const rootElement = this.getElem();
    if (rootElement) {
      // eslint-disable-next-line no-unused-expressions
      removeAllChildren(rootElement);
      rootElement.appendChild(templateNode);
      await this.renderComponents(); 
      await onViewLoaded(); 
    }
    await this.trigerHook('render', data);
    await this.trigerHook('afterRender', data);
    deactivateTemplateLoader();
  }
}
