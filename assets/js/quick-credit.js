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

/**Template Engine actions */
const initialiseTemplateEngine = () =>{
    const templateScript = document.createElement('script');
    const mockScript = document.createElement('script');
    templateScript.src = '/UI/assets/js/template.js';
    templateScript.id = "template-js";
    mockScript.src = '/UI/assets/js/mock.js';
    document.body.insertBefore(templateScript, document.getElementById('main-js'));
    document.body.insertBefore(mockScript, document.getElementById('main-js'));

};

initialiseTemplateEngine();
// loads the js template file
document.body.onload = () => {

    addEventToDomNodelist('click', modalCloseButton, (event)=>{
        const modal = event.target.parentNode;
        const modalParent = modal.parentNode;
        modal.classList.add('hide');
        if(modalParent && modalParent.classList.contains('overlay')) modalParent.classList.add('hide');
    });

    
    Mock();

}


