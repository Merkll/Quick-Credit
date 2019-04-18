(function(){
    const templateHtml = `
    <div class="card-container">
        {{cards}}
    </div> 
 `;


    const cardContainer = {
        root: 'card-container-root',
        classNames: [],
        template: templateHtml
    };
    templates['card-container'] = cardContainer;
}());