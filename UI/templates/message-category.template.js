(function(){
    const templateHtml = `
    <ul>
        {{category}}
    </ul>
 `;


    const messageCategory = {
        root: 'message-category-root',
        classNames: [],
        template: templateHtml
    };
    templates['message-category'] = messageCategory;
}());