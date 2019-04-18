(function(){
    const templateHtml = `
    <div class="card-container">
        {{cards}}
    </div> 
 `;


    const cardContainer = {
        root: 'card-container-root',
        classNames: [],
        template: templateHtml,
        childComponent: 'loans-card',
        childTag: 'cards',
    };
    templates['card-container'] = cardContainer;
}());