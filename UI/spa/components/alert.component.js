/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */

import Component from '../helper/component.js'; 

const templateHtml = `
<div class="alert {{classes}}">
    <i class="close-btn icon close"></i>
    <p class="message">
        {{content}}
    </p>
</div>
`;

export default new Component('alert', {
  render: (template) => {
    const templateElement = document.createElement('template');
    const nodeToAppend = document.querySelector('.container') || document.querySelector('body');
    templateElement.innerHTML = template;
    const alertDomElement = templateElement.content.childNodes[0];
    alertDomElement.classList.add('show');
    nodeToAppend.appendChild(alertDomElement);
    return alertDomElement;
  },
  classNames: [],
  template: templateHtml
});
