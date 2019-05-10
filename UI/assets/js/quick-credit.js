/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/**
 * Handles attaching events for nodelist
 * @param {*} listOfNodes {an array of DOM nodes} 
 * @param {*} event {string specifing event. Should be a valid JS event}
 * @param {*} eventHandler {callback function}
 */

const addEventToDomNodelist = (event, listOfNodes, eventHandler) => {
  for (const node of listOfNodes) {
    node.addEventListener(event, eventHandler);
  }
};

/**
 * Loops through a Nodelist and calls the callback function for each node
 * @param {*} listOfNodes 
 * @param {*} callbackFunction 
 */
const foreachNodeInNodelist = (listOfNodes, callbackFunction) => {
  for (const node of listOfNodes) {
    callbackFunction(node);
  }  
};

/** Template Engine actions */
const initialiseTemplateEngine = () => {
  const templateScript = document.createElement('script');
  const mockScript = document.createElement('script');
  templateScript.src = 'assets/js/template.js';
  templateScript.id = 'template-js';
  mockScript.src = 'assets/js/mock.js';
  document.body.insertBefore(templateScript, document.getElementById('main-js'));
  document.body.insertBefore(mockScript, document.getElementById('main-js'));
};

initialiseTemplateEngine();
// loads the js template file
document.body.onload = () => {
  const modalCloseButton = document.querySelectorAll('.close-btn');
  const formSubmitButton = document.querySelectorAll('button[type="submit"]');
    
  // event handler for dynamic dom elements rendered by the template engine
  document.addEventListener('click', (event) => {
    if (event.target.matches('.close-btn')) modalCloseAction(event);
    if (event.target.matches('.view-loan')) viewLoanAction(event);
    if (event.target.matches('.view-client')) viewClientAction(event);
    if (event.target.matches('.new-message')) newMessageAction(event);
    if (event.target.matches('.view-message')) viewMessageAction(event);
    if (event.target.matches('.sidebar-icon i')) sideBarAction(event);
    if (event.target.matches('.loan-action')) loanAction(event);
    if (event.target.matches('.client-action')) clientAction(event);
  });

  addEventToDomNodelist('click', formSubmitButton, (event) => {
    event.preventDefault();
    const button = event.target;
    const formNode = button.closest('form');
    if (!formNode) return null;
    const nameOfForm = formNode.id;   
    const data = new FormData(formNode);
    const functionToHandleForm = formActions[nameOfForm];
    if (functionToHandleForm) return functionToHandleForm(data);
    return null;
  });
  pageSetup();
};

const calculateRate = (formData) => {
  const amount = parseFloat(formData.get('amount'));
  const tenor = parseInt(formData.get('tenor'));
  const interest = (5 / 100) * amount;
  const payment = Math.round((amount + interest) / tenor).toFixed(2);
  if (!(interest && payment)) return;
  displayRate({ interest, payment });
};

const displayRate = ({ interest, payment }) => {
  const message = `The Interest for your calculated loan is #${interest}. With monthly repayment of #${payment}
    </br>
     Login or Signup now to continue

    `;
  render('alert', { content: message });
};

const login = (formData) => {
  const email = formData.get('email');
  render('alert', { content: `Welcome ${email}` });
};

const signup = (formData) => {
  const email = formData.get('email');
  render('alert', { content: `Account Creation succesfull for ${email}` });
};

const passwordReset = (formData) => {
  const email = formData.get('email');
  render('alert', { content: `Password reset succesfull for ${email}` });
};

const modalCloseAction = (event) => {
  const modal = event.target.parentNode;
  const modalParent = modal.closest('.overlay');
  modal.classList.remove('show');
  if (modalParent) modalParent.classList.remove('show');
};

const viewLoanAction = async (event) => {
  event.preventDefault();
  const loanId = event.target.dataset.loan;
  const repayments = Mock.repayments[loanId];
  const loanDetails = Mock.loanDetails[loanId];
  await render('single-loan', {}, { repayments, loanDetails });
  document.querySelector('.full-overlay').classList.add('show');
};

const viewClientAction = async (event) => {
  event.preventDefault();
  const clientId = event.target.dataset.client;
  const clientDetails = Mock.clientDetails[clientId];
  const clientLoans = Mock.loans;
  await render('single-client', {}, { clientDetails, clientLoans });
  document.querySelector('.full-overlay').classList.add('show');
};

const newMessageAction = (event) => {
  event.preventDefault();
  const newButton = event.target;
  const newButtonListItem = newButton.closest('li');
  const activeLinks = document.querySelector('.active-category');
  activeLinks.classList.remove('active-category');
  newButtonListItem.classList.add('active-category');
  render('message', {});
};
const viewMessageAction = (event) => {
  event.preventDefault();
  const newButton = event.target;
  const messageId = newButton.dataset.message;
  const newButtonListItem = newButton.closest('li');
  const activeLinks = document.querySelector('.active-category');
  activeLinks.classList.remove('active-category');
  newButtonListItem.classList.add('active-category');
  const message = Mock.message.details[messageId];
  render('message', message);
};

const sideBarAction = (event) => {
  event.preventDefault();
  const sideBar = document.querySelector('.sidebar');
  event.target.classList.toggle('close');
  sideBar.classList.toggle('show');
};

const loanAction = async (event) => {
  event.preventDefault();
  const actionBtn = document.querySelectorAll('.loan-action');
  const { action } = event.target.dataset;
  render('alert', { content: `Loan ${action} Succesful` });
};

const clientAction = async (event) => {
  event.preventDefault();
  const actionBtn = document.querySelectorAll('.client-action');
  const { action } = event.target.dataset;
  render('alert', { content: `Client ${action} Succesful` });
};

const loanApplication = (formData) => {
  render('alert', { content: 'Loan application Successful' });
};


const formActions = {
  calculator: calculateRate, login, signup, apply: loanApplication, 'password-reset': passwordReset 
};


// page rendering

const pageSetup = () => {
  const pageRenderer = {
    home: homePageRender,
    'client-loans': clientLoanPageRender,
    'client-inbox': clientInboxRender,
    application: applicationPageRender,
    'password-reset': homePageRender,
    'single-loan': singleLoanRender,
    'admin-loans': adminLoansRender,
    'single-client': singleClientRender,
    clients: clientRender

  };
  const currentPage = document.getElementsByTagName('body')[0].dataset.page;
  const renderer = pageRenderer[currentPage];
  if (renderer) return renderer();
  return null;
};

const clientRender = () => {
  const { clients } = Mock;
  const sidebar = Mock.adminSidebar;
  const topMenu = Mock.clientTopMenu;
  render('top-menu', topMenu);
  render('card-container', clients);
  render('sidebar', sidebar);
};

const singleClientRender = () => {
  const clientDetails = Mock.clientDetails['#88828289'];
  const clientLoans = Mock.loans;
  const sidebar = Mock.adminSidebar;
  const topMenu = Mock.clientTopMenu;
  render('top-menu', topMenu);
  render('single-client', {}, { clientDetails, clientLoans });
  render('sidebar', sidebar);
};

const adminLoansRender = () => {
  const { loans } = Mock;
  const sidebar = Mock.adminSidebar;
  const topMenu = Mock.clientTopMenu;
  render('top-menu', topMenu);
  render('card-container', loans);
  render('sidebar', sidebar);
};

const homePageRender = () => {
  const topMenu = Mock.HomeTopMenu;
  render('top-menu', topMenu);
};
const clientLoanPageRender = () => {
  const { loans } = Mock;
  const sidebar = Mock.clientSidebar;
  const topMenu = Mock.clientTopMenu;
  render('top-menu', topMenu);
  render('card-container', loans);
  render('sidebar', sidebar);
};

const applicationPageRender = () => {
  const sidebar = Mock.clientSidebar;
  const topMenu = Mock.clientTopMenu;
  render('top-menu', topMenu);
  render('sidebar', sidebar);
};

const clientInboxRender = () => {
  const sidebar = Mock.clientSidebar;
  const { categories, details } = Mock.message;
  const topMenu = Mock.clientTopMenu;
  render('top-menu', topMenu);
  render('sidebar', sidebar);
  render('message', details);
  render('message-category', categories);
  // render('message-single-category', categories);
};

const singleLoanRender = () => {
  const sidebar = Mock.clientSidebar;
  const repayments = Mock.repayments['#88828289'];
  const loanDetails = Mock.loanDetails['#88828289'];
  const topMenu = Mock.clientTopMenu;
  render('top-menu', topMenu);
  render('sidebar', sidebar);
  render('single-loan', {}, { repayments, loanDetails });
};
