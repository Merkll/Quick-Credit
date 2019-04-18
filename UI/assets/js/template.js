var templates = {};
const render = (()=>{
        
    /**
     * Loads the temlate files as script tags in the dom.
     *  Since we do not have access to the file system, the templatefiles have to be provided as arrays
     * @param {Array} templateFiles 
     * @param {String} templatePath
     */
    const loadTemplateFiles = (components, templatePath = '/UI/templates/') =>{
        if(!(components instanceof Array)) return;
        return components.map(async (template) => await loadTemplateFile(template, templatePath));
    }

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
        return templateHtml.replace(new RegExp(templateTag, 'g'), `${value}${templateTag}`);
    }

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
                    templateHtml = await multipleChildPopulate({templateHtml, childNodes:value, rootTag:tag});
                }else{
                    templateHtml = replaceTag(templateHtml, tag, value);
                }
            } 
        }
        return templateHtml.trim();
    }

    /**
     * Renders the template file
     * @param {String} template 
     */
    const render = async (templateComponent, tags) => {
       const { component, template: templateHtml } = await loadTemplateFile(templateComponent);
        if(component){
            const populatedTemplate = await populate({templateHtml, tags, component});
            const html = replaceTrailingTags(populatedTemplate);
            const { root, render: templateRenderFunction } = component;
            if(templateRenderFunction) return templateRenderFunction(html);
            const rootElement = document.getElementById(root);
            if(rootElement) rootElement.innerHTML = html; 
            return html;            
        }
    }
    return render;
})();

