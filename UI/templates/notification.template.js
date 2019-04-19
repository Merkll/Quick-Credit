(function(){
    const templateHtml = `
        <div class="notification">
        <i class="close-btn icon close"></i>
        <p class="message">
                {{content}}
            </p>
        </div>
    `;


    const notificationTemplate = {
        render: (template) =>{
            const templateElement = document.createElement('template');
            const nodeToAppend = document.querySelector('.container');
            templateElement.innerHTML = template;
            const notificationDomElement = templateElement.content.childNodes[0];
            notificationDomElement.classList.add('show')
            nodeToAppend.appendChild(notificationDomElement);
            return notificationDomElement;
        },
        classNames: [],
        template: templateHtml
    };
    templates['notification'] = notificationTemplate;
}());