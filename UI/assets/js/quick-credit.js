const modalCloseButton = document.querySelectorAll('.close-btn');


/**
 * Handles attaching events for nodelist
 * @param {*} listOfNodes {an array of DOM nodes} 
 * @param {*} event {string specifing event. Should be a valid JS event}
 * @param {*} eventHandler {callback function}
 */

const addEventToDomNodelist = (event, listOfNodes, eventHandler) =>{
    for (const node of listOfNodes) {
        node.addEventListener(event, eventHandler)
      }
}

/**
 * Loops through a Nodelist and calls the callback function for each node
 * @param {*} listOfNodes 
 * @param {*} callbackFunction 
 */
const foreachNodeInNodelist = (listOfNodes, callbackFunction) => {
    for (const node of listOfNodes) {
        callbackFunction(node);
    }  
}

addEventToDomNodelist('click', modalCloseButton, (event)=>{
    const modal = event.target.parentNode;
    const modalParent = modal.parentNode;
    modal.classList.add('hide');
    if(modalParent && modalParent.classList.contains('overlay')) modalParent.classList.add('hide');
});


/**Template Engine actions */
const initialiseTemplateEngine = () =>{
    const templateScript = document.createElement('script');
    templateScript.src = '/UI/assets/js/template.js';
    templateScript.id = "template-js";
    document.body.insertBefore(templateScript, document.getElementById('main-js'));

};

initialiseTemplateEngine()
// loads the js template file

const sidebarTags = {
    "accountName": "Mike John",
    "inboxCount": 55

}
const topmenuTags = {
    links: [
        {
            text: "Logout",
            href: '/home',
            baseTemplate: '<a href="{{href}}">{{text}}</a>',
            // data: 'a'
        },
        {
            text: "Name",
            href: '/home',
            baseTemplate: '<a href="{{href}}">{{text}}</a>',
            // data: 'a'
        }
    ]
}
document.body.onload = () => {
    loadTemplateFiles(['sidebar', 'top-menu'])
    .then((res)=> render('sidebar', sidebarTags))
    .then((res)=> render('top-menu', topmenuTags))


}


