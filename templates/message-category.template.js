/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
    <ul>
        {{category}}
    </ul>
 `;


  const messageCategory = {
    root: 'message-category-root',
    classNames: [],
    template: templateHtml,
    childComponent: 'message-single-category',
    childTag: 'category',
  };
  global.templates['message-category'] = messageCategory;
})(this);
