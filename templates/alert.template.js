(function(){
    const templateHtml = `
        <div class="alert">
            <i class="close-btn icon close"></i>
            <p class="message">
                {{content}}
            </p>
        </div>
    `;


    const alertTemplate = {
        render: (template) =>{
            const templateElement = document.createElement('template');
            const nodeToAppend = document.querySelector('.container');
            templateElement.innerHTML = template;
            const alertDomElement = templateElement.content.childNodes[0];
            alertDomElement.classList.add('show')
            nodeToAppend.appendChild(alertDomElement);
            return alertDomElement;
        },
        classNames: [],
        template: templateHtml
    };
    templates['alert'] = alertTemplate;
}());