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

const repayments = {
    childrenTemplate: 'repayments-table-row',
    childrenTag: 'repayments',
    data: [
        {
            paymentId: '#9i998746564',
            paymentDate: '31 March 2019',
            paymentAmount: 6000,
            balance: 6000
        },
        {
            paymentId: '#9i998746564',
            paymentDate: '31 March 2019',
            paymentAmount: 6000,
            balance: 6000
        },
        {
            paymentId: '#9i998746564',
            paymentDate: '31 March 2019',
            paymentAmount: 6000,
            balance: 6000
        },
        {
            paymentId: '#9i998746564',
            paymentDate: '31 March 2019',
            paymentAmount: 6000,
            balance: 6000
        }
    ]
}

const loanDetails = {
    loanId:  '#9i998746564',
    status: 'pending',
    applicationDate: '31 Mar 2019',
    loanAmount: 6000,
    loanTenor: 6,
    loanBalance: 3000,
    nextRepayment: '31 Mar 2019'
}
const messageDetails = {
    subject: "Approval of Loan #9908udu",
    content : "Loan Approved",
    action: '<a href="">Reply</a>'
}
const messageCategoryDetails = {
    subject: "Approval of Loan #9908udu",
    content : "Loan Approved",
    action: '<a href="">Reply</a>'
}
const messageCategory = {
    childrenTemplate: 'message-single-category',
    childrenTag: 'category',
    data: [
        {
            text: 'New'
        },
        {
            text: 'Loan-#88iodha98',
            class: 'active-category'
        }
    ]
}
document.body.onload = () => {
    loadTemplateFiles(['sidebar', 'top-menu', 'alert', 'notification', 'modal', 
    'loans-card', 'card-container', 'repayments', 'repayments-table-row', 'loan-details', 'message', 'message-category', 'message-single-category' ])
    // .then((res)=> render('sidebar', sidebarTags))
    // .then((res)=> render('top-menu', topmenuTags))
    // .then((res)=> render('alert', topmenuTags))
    // .then((res)=> render('notification', topmenuTags))
    // .then((res)=> render('modal', {content: "Hello from templa"}))
    // .then((res)=> render('loans-card', loanCardData))
    // .then((res)=> render('card-container', cardContainer))
    // .then((res)=> render('repayments', repayments))
    // .then((res)=> render('loan-details', loanDetails))
    .then((res)=> render('message', messageDetails))
    .then((res)=> render('message-category', messageCategory))
    // .then((res)=> render('message-single-category', messageDetails))




}


