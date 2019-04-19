(function(){
    const templateHtml = `
        <div class="modal">
        <i class="close-btn icon close"></i>
        <p class="message">
                {{content}}
            </p>
        </div>
    `;


    const modalTemplate = {
        render: (template) =>{
            const templateElement = document.createElement('template');
            const nodeToAppend = document.querySelector('.container');
            templateElement.innerHTML = template;
            const modalDomElement = templateElement.content.childNodes[0];
            modalDomElement.classList.add('show')
            nodeToAppend.appendChild(modalDomElement);
            return modalDomElement;
        },
        classNames: [],
        template: templateHtml
    };
    templates['modal'] = modalTemplate;
}());