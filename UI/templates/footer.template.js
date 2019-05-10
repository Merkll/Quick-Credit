/* eslint-disable no-param-reassign */
((global) => {
  const templateHtml = `
    <footer class="footer">
            <small>&copy; Copyright 2018,Quick Credit</small>   
    </footer>
`;


  const footer = {
    root: 'footer-root',
    classNames: [],
    template: templateHtml
  };
  global.templates.footer = footer;
})(this);
