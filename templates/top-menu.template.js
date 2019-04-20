(function(){
    const templateHtml = `
        <div class="menu">
        <a href="../index.html"><span class="logo">Quick Credit</span></a>            
            <nav>
                {{links}}
            </nav>
        </div>
    `;


    const topMenuTemplate = {
        root: 'top-menu-root',
        classNames: [],
        template: templateHtml
    };
    templates['top-menu'] = topMenuTemplate;
}());