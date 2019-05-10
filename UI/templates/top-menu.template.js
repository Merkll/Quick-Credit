/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
      <div class="menu">
      <a href="../index.html"><span class="logo">Quick Credit</span></a>            
          <nav>
              {{links}}
          </nav>
      </div>
  `;

  const topMenuTemplate = {
    root: 'top-menu-root',
    classNames: [],
    template: templateHtml,
    afterRender: async (data, render) => {
      const footerHtml = await render('footer', {});
      const footerTemplateElement = document.createElement('template');
      footerTemplateElement.innerHTML = footerHtml;
      const footerNode = footerTemplateElement.content.childNodes[0];
      document.body.appendChild(footerNode);            
    }
  };
  global.templates['top-menu'] = topMenuTemplate;
})(this);
