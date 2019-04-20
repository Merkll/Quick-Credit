var templates = {};
const render = (()=>{
    /**
     * Loads the list of components js files as script tags in the dom.
     *  Since we do not have access to the file system, the templatefiles have to be provided as arrays
     * @param {Array} components
     * @param {String} templatePath
     */
    const loadTemplateFiles = (components, templatePath = '/UI/templates/') =>{
        if(!(components instanceof Array)) return;
        return components.map(async (template) => await loadTemplateFile(template, templatePath));
    }

    /**
     * Loads a component js file as script tags in the dom.
     *  Since we do not have access to the file system, the templatefiles have to be provided as arrays
     * @param {string} component {the component must match with the file name of the component file without the .template suffix}
     * @param {String} templatePath
     */

    const loadTemplateFile = (component, templatePath = '/UI/templates/') => {
        if(templates[component]) return { component: templates[component], template: templates[component].template } ;
        if(component.type == 'literal') return {component: component.data, template: component.data };
        return new Promise((resolve, reject) =>{
            const referenceScript = document.getElementById('template-js');
            const script = document.createElement('script');
            script.src = `${templatePath}${component}.template.js`;
            document.body.insertBefore(script, referenceScript);
            script.addEventListener('load', () => {
                const componentObject = templates[component];
                const template = templates[component].template;
                resolve({ component: componentObject, template });
            });
        });
    }

    const replaceTrailingTags = (templateHtml) => {
        const tagsRegularExp = new RegExp(/{{.*?}}/, 'gi'); 
        return templateHtml.replace(tagsRegularExp, "");
    }

    const replaceTag = (templateHtml, tag, value) => {
        const templateTag = `{{${tag}}}`;
        return templateHtml.replace(new RegExp(templateTag, 'g'), `${value}${templateTag}`); //appends original tag to handle multiple elements
    }

    /**
     * Handles component with multiple childNodes
     * @param {Object}
     */
    const multipleChildPopulate = async ({ templateHtml, childNodes, childTag, childTemplate, childComponent, rootTag}) => {
        for (const child of childNodes) {
            const { data, baseTemplate = childComponent } = child; //data takes precedence
            if(data){
                templateHtml = replaceTag(templateHtml, childTag, data);
            }else if(baseTemplate){
                const html = await render(baseTemplate, child);
                const childTemplate = {};
                childTemplate[childTag] = html; 
                templateHtml = await populate({templateHtml, tags: childTemplate}); 
            }   
        }
        return templateHtml;
    } 

    const isArray = (data) => !!(data instanceof Array)
    const isObject = (data) => !!(data instanceof Object)
    /**
     * 
     * @param {String} templateHtml 
     * @param {Object | Array} tags template tags to replace
     * @param {String} rootTag the root tag to replace in event of multiple fields
     */
    const populate = async ({templateHtml, tags, rootTag = "", component = {}}) => {
        if(!isObject(tags)) return;
        const { childComponent: componentChildComponent, childTag: componentChildTag } = component;
        const { childTag = componentChildTag, childNodes, childComponent = componentChildComponent } = tags;
        if(childTag && isArray(childNodes)) {
            templateHtml = await multipleChildPopulate({ templateHtml, childNodes, childTag, childComponent});
        }else{
            for (const [tag, value] of Object.entries(tags)){
                if(isArray(value)){
                    const childNodes = value;                   
                    templateHtml = await multipleChildPopulate({templateHtml, childNodes, rootTag:tag});
                }else if(isArray(value.childNodes)){
                    const { childNodes, childComponent, childTag } = value;                   
                    templateHtml = await multipleChildPopulate({templateHtml, childNodes, childComponent, childTag, rootTag:tag});
                }else{
                    templateHtml = replaceTag(templateHtml, tag, value);
                }
            }
        }
        return templateHtml.trim();
    }

    const templateHook = ({component, action, data = {}}) => {
        if(component[action]){
            const hookData = (data[action]) ? data[action] : data
            const hookFunction = component[action];
            if(hookFunction) hookFunction(hookData);
        }     
    }

    const activateTemplateLoader = () => {
        const loaderInDom = document.querySelector('.loader-overlay');
        if(loaderInDom) {
           return loaderInDom.classList.add('show');
        }; //adds element in dom once
        const loaderOverlay = document.createElement('div');
        loaderOverlay.setAttribute('class', "overlay full-overlay bg-white loader-overlay show");
        loaderOverlay.innerHTML =  `<div class="loader"></div>`;
        document.body.appendChild(loaderOverlay);
    }

    const deactivateTemplateLoader = () => {
        const loaderOverlay = document.querySelector('.loader-overlay');
        loaderOverlay.classList.remove('show');
    }

    /**
     * Renders the template file
     * @param {String} template 
     */
    const render = async (templateComponent, tags, dataToPassHook = {}) => {
       activateTemplateLoader();
       const { component, template: templateHtml } = await loadTemplateFile(templateComponent);
        if(component){
            const populatedTemplate = await populate({templateHtml, tags, component});
            if(!populatedTemplate) return;
            const html = replaceTrailingTags(populatedTemplate);
            const { root, render: templateRenderFunction } = component;
            if(templateRenderFunction) {
                templateRenderFunction(html);
            }else{
                const rootId = tags.root || root;
                const rootElement = document.getElementById(rootId);
                if(rootElement) rootElement.innerHTML = html; 
                templateHook({component, action: 'afterRender', data: dataToPassHook});
            }
            deactivateTemplateLoader();
            return html;            
        }
    }
    return render;
})();