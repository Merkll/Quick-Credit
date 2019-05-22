/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
    <div class="card-container">
        {{cards}}
    </div> 
 `;


  const cardContainer = {
    root: 'card-container-root',
    classNames: [],
    template: templateHtml,
    childComponent: 'loans-card',
    childTag: 'cards',
  };
  global.templates['card-container'] = cardContainer;
})(this);
