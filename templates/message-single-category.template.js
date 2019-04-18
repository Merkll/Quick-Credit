(function(){
    const templateHtml = `
        <li class="{{class}}"><a href="#">{{text}}</a></li>
 `;


    const messageCategory = {
        root: 'message-category-root',
        classNames: [],
        template: templateHtml
    };
    templates['message-single-category'] = messageCategory;
}());