/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const templates = {};
// eslint-disable-next-line no-unused-vars
  /**
     * Loads the list of components js files as script tags in the dom.
     *  Since we do not have access to the file system, the templatefiles have to be provided as arrays
     * @param {Array} components
     * @param {String} templatePath
     */


  /**
   * Loads a component js file as script tags in the dom.
   *  Since we do not have access to the file system,
   *  the templatefiles have to be provided as arrays
   * @param {string} component 
   * {the component must match with the file name of the component 
   * file without the .template suffix}
   * @param {String} templatePath
  */

  const loadTemplateFile = (component, templatePath = 'components/') => {
    if (templates[component]) { 
      return { component: templates[component], template: templates[component].template };
    }
    if (component.type === 'literal') return { component: component.data, template: component.data };
    return new Promise(async (resolve) => {
      const importedComponent = (await import(`../${templatePath}${component}.component.js`)).default;
      templates[component] = importedComponent.definition();
      const componentObject = templates[component];
      const { template } = templates[component];
      resolve({ component: componentObject, template });
    });
  };

  // eslint-disable-next-line no-unused-vars
  const loadTemplateFiles = (components, templatePath = 'templates/') => {
    if (!(components instanceof Array)) return null;
    return components.map(template => loadTemplateFile(template, templatePath));
  };

  export const replaceTrailingTags = (templateHtml) => {
    const tagsRegularExp = new RegExp(/{{.*?}}/, 'gi'); 
    return templateHtml.replace(tagsRegularExp, '');
  };

  export const replaceTag = (templateHtml, tag, value) => {
    const templateTag = `{{${tag}}}`;
    return templateHtml.replace(new RegExp(templateTag, 'g'), `${value}${templateTag}`); // appends original tag to handle multiple elements
  };

  export const mapStringReplace = (template, dataToreplace) => {
    let data = dataToreplace;
    let replacedTemplate = template;
      Object.entries(data).map(([key, value]) => {
        replacedTemplate = replaceTag(replacedTemplate, key, value);
      });
    return replaceTrailingTags(replacedTemplate);
  }

  export const generateMultiFromTemplate = (template, data) =>{
    return data.map((singleData) => mapStringReplace(template, singleData)).join(' ');
  }

  /**
     * Handles component with multiple childNodes
     * @param {Object}
     */
  // eslint-disable-next-line no-unused-vars
  const multipleChildPopulate = async ({ templateHtml, childNodes, childTag, childTemplate, childComponent, rootTag }) => {
    for (const child of childNodes) {
      const { data, baseTemplate = childComponent } = child; // data takes precedence
      console.log(child);
      if (data) {
        templateHtml = replaceTag(templateHtml, childTag, data);
      } else if (baseTemplate) {
        const html = await render(baseTemplate, child);
        const childTemplate = {};
        childTemplate[childTag] = html; 
        templateHtml = await populate({ templateHtml, tags: childTemplate }); 
      }   
    }
    return templateHtml;
  }; 

  const isArray = data => !!(data instanceof Array);
  const isObject = data => !!(data instanceof Object);

  /**
     * 
     * @param {String} templateHtml 
     * @param {Object | Array} tags template tags to replace
     * @param {String} rootTag the root tag to replace in event of multiple fields
     */
  // eslint-disable-next-line object-curly-newline
  // eslint-disable-next-line no-unused-vars
  const populate = async ({ templateHtml, tags, rootTag = '', component = {} }) => {
    if (!isObject(tags)) return;
    const { childComponent: componentChildComponent, childTag: componentChildTag } = component;
    const { childTag = componentChildTag, childNodes, 
      childComponent = componentChildComponent 
    } = tags;
    if (childTag && isArray(childNodes)) {
      templateHtml = await multipleChildPopulate({ templateHtml, childNodes, childTag, childComponent });
    } else {
      for (const [tag, value] of Object.entries(tags)) {
        if (isArray(value)) {
          const childNodes = value;                   
          templateHtml = await multipleChildPopulate({ templateHtml, childNodes, rootTag: tag });
        } else if (isArray(value.childNodes)) {
          const { childNodes, childComponent, childTag } = value;                   
          templateHtml = await multipleChildPopulate({ templateHtml, childNodes, childComponent, childTag, rootTag: tag });
        } else {
          templateHtml = replaceTag(templateHtml, tag, value);
        }
      }
    }
    // eslint-disable-next-line consistent-return
    return templateHtml.trim();
  };

  const templateHook = ({ component, action, data = {} }) => {
    if (component[action]) {
      const hookData = (data[action]) ? data[action] : data;
      const hookFunction = component[action];
      // eslint-disable-next-line no-use-before-define
      if (hookFunction) hookFunction(hookData, render);
    }     
  };

  export const activateTemplateLoader = () => {
    const loaderInDom = document.querySelector('.loader-overlay');
    const container = document.querySelector('.container') || document.querySelector('body');
    if (loaderInDom) {
      return loaderInDom.classList.add('show');
    } // adds element in dom once
    const loaderOverlay = document.createElement('div');
    loaderOverlay.setAttribute('class', 'overlay full-overlay bg-white loader-overlay show');
    loaderOverlay.innerHTML = '<div class="loader"></div>';
    return container.appendChild(loaderOverlay);
  };

  export const deactivateTemplateLoader = () => {
    const loaderOverlay = document.querySelector('.loader-overlay');
    loaderOverlay.classList.remove('show');
  };

  /**
     * Renders the template file
     * @param {String} template 
     */
  export const render = async (templateComponent, tags, dataToPassHook = {}) => {
    activateTemplateLoader();
    const { component, template: templateHtml } = await loadTemplateFile(templateComponent);
    if (component) {
      const populatedTemplate = await populate({ templateHtml, tags, component });
      if (!populatedTemplate) return null;
      const html = replaceTrailingTags(populatedTemplate);
      const { root, render: templateRenderFunction } = component;
      if (templateRenderFunction) {
        templateRenderFunction(html, render);
      } else {
        const rootId = tags.root || root;
        const rootElement = document.getElementById(rootId);
        if (rootElement) rootElement.innerHTML = html; 
        templateHook({ component, action: 'afterRender', data: dataToPassHook });
      }
      deactivateTemplateLoader();
      return html;            
    }
    return null;
  };