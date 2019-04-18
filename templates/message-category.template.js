(function(){
    const templateHtml = `
    <ul>
        {{category}}
    </ul>
 `;


    const messageCategory = {
        root: 'message-category-root',
        classNames: [],
        template: templateHtml,
        childComponent: 'message-single-category',
        childTag: 'category',
    };
    templates['message-category'] = messageCategory;
}());