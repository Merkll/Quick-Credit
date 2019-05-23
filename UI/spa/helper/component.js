/* eslint-disable import/named */
/* eslint-disable import/extensions */
import { render } from './render.js';

export default class Component {
  constructor(componentName, componentDefinition, customRender) {
    this.name = componentName;
    this.componentDefinition = componentDefinition;
    this.customRender = customRender ? customRender.bind(this) : customRender;
  }

  async render(renderData) {
    let data;
    if (this.customRender) data = await this.customRender(renderData);
    else data = await render(this.name, renderData);
    return data;
  }

  definition() {
    return this.componentDefinition;
  }
}
