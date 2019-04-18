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
const loanCardData = {
    loanId: "#88828288"
}
const cardContainer = {
    childrenTemplate: 'loans-card',
    childrenTag: 'cards',
    data: [
        {
            loanId: "#88828288" 
        }, {
            loanId: "#88828289"
        }
    ]
}
document.body.onload = () => {
    loadTemplateFiles(['sidebar', 'top-menu', 'alert', 'notification', 'modal', 'loans-card', 'card-container'])
    // .then((res)=> render('sidebar', sidebarTags))
    // .then((res)=> render('top-menu', topmenuTags))
    // .then((res)=> render('alert', topmenuTags))
    // .then((res)=> render('notification', topmenuTags))
    // .then((res)=> render('modal', {content: "Hello from templa"}))
    // .then((res)=> render('loans-card', loanCardData))
    .then((res)=> render('card-container', cardContainer))



}


