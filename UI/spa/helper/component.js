/* eslint-disable import/named */
/* eslint-disable import/extensions */
import { render } from './render.js';

export default class Component {
  constructor(componentName, componentDefinition) {
    this.name = componentName;
    this.componentDefinition = componentDefinition;
  }

  async render(renderData) {
    const data = await render(this.name, renderData);
    return data;
  }

  definition() {
    return this.componentDefinition;
  }
}
