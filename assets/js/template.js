/**
 * Loads the temlate files as script tags in the dom.
 *  Since we do not have access to the file system, the templatefiles have to be provided as arrays
 * @param {Array} templateFiles 
 * @param {String} templatePath
 */
var templates = {};
const loadTemplateFiles = (templateFiles, templatePath = '/UI/templates/') =>{
    if(!(templateFiles instanceof Array)) return;
    const files = templateFiles.map(template => {
        return new Promise((resolve, reject) =>{
            const referenceScript = document.getElementById('template-js');
            const script = document.createElement('script');
            script.src = `${templatePath}${template}.template.js`;
            script.defer = false;
            script.async= false;
            document.body.insertBefore(script, referenceScript);
            script.addEventListener('load', () => {
                resolve(template);
            });
        });
    });
    return Promise.all(files);
}
let count = 0;
const replaceTrailingTags = (templateHtml) => {
    const tagsRegularExp = new RegExp(/{{.*?}}/, 'gi');    
    return templateHtml.replace(tagsRegularExp, "");
}

const replaceTag = (templateHtml, tag, value) => {
    const templateTag = `{{${tag}}}`;
    return templateHtml.replace(templateTag, `${value}${templateTag}`);
}

const multiTagsPopulate = (templateHtml, tags, rootTag) => {
  for (const singleTag of tags) {
      const data = singleTag.data;
      const baseTemplate = singleTag.baseTemplate;
      if(data){
          templateHtml = replaceTag(templateHtml, rootTag, data);
      }else if(baseTemplate && templates[baseTemplate]){
            const html = render(baseTemplate, singleTag);
            const childTemplate = [];
            childTemplate[rootTag] = html;
            templateHtml = populate(templateHtml, tags);
      }else if(baseTemplate){
          const baseHtml = populate(baseTemplate, singleTag);
          templateHtml = replaceTag(templateHtml, rootTag, baseHtml)
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
const populate = (templateHtml, tags, rootTag = "") => {
    if(isObject(tags)){
        for (const [tag, value] of Object.entries(tags)){
            if(isArray(value)){
                templateHtml = multiTagsPopulate(templateHtml, value, tag);

            }else{
                templateHtml = replaceTag(templateHtml, tag, value);
            }
        } 
    }else if(isArray(tags)){
        templateHtml = multiTagsPopulate(templateHtml, value, rootTag);
    }
    return replaceTrailingTags(templateHtml);
}

/**
 * Renders the template file
 * @param {String} template 
 */

const render = (template, tags) => {
    if(templates && templates[template]){
        template = templates[template];
        const templateRoot = template.root;
        const rootElement = document.getElementById(templateRoot);
        const html = populate(template.template, tags);
        if(rootElement) rootElement.innerHTML = html; 
        return html;  
    }
}

