/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
        <li class="{{class}}"><a href="#" data-message="{{messageId}}" class="{{linkClass}}">{{text}}</a></li>
 `;


  const messageCategory = {
    root: 'message-category-root',
    classNames: [],
    template: templateHtml
  };
  global.templates['message-single-category'] = messageCategory;
})(this);
