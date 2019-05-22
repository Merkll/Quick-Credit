/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-syntax */
export const addEventToDomNodelist = (event, listOfNodes, eventHandler) => {
  for (const node of listOfNodes) {
    node.addEventListener(event, eventHandler);
  }
};

/**
 * Loops through a Nodelist and calls the callback function for each node
 * @param {*} listOfNodes 
 * @param {*} callbackFunction 
 */
export const foreachNodeInNodelist = (listOfNodes, callbackFunction) => {
  for (const node of listOfNodes) {
    callbackFunction(node);
  }  
};


export const validateFormFields = (formData, form) => {
  const validators = {
    email: (email) => {
      const re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'gi');
      return { valid: re.test(String(email).toLowerCase()), message: 'Email address should follow this format user@exmaple.com' };
    },
    phone: (phone) => {
      const re = new RegExp(/[0-9]{11}/);
      return { valid: re.test(String(phone)), message: 'Phone number should follow this format 08098735167' };
    },
    password: password => ({ valid: password.length >= 6, message: 'Password should have min 6 chars' }),
    amount: amount => ({ valid: !!parseFloat(amount) }),
    number: number => ({ valid: typeof number === 'number' }),
  };
  const messages = [];
  for (const [fieldName, fieldValue] of formData.entries()) {
    const inputNode = form.querySelector(`input[name="${fieldName}"]`);
    const { validator } = inputNode.dataset;
    const isRequired = inputNode.required;
    let isFieldValid = true;
    if (validator) isFieldValid = validators[validator](fieldValue);
    if (fieldValue.length === 0 && isRequired) {
      messages.push(`field ${fieldName} is Required`);
      inputNode.style.borderColor = 'red';
    } else if (validator && !isFieldValid.valid) {
      messages.push(isFieldValid.message || `field ${fieldName} is not valid`);
      inputNode.style.borderColor = 'red';
    } else inputNode.style.borderColor = 'white';
  }
  if (messages.length > 0) {
    return { valid: false, messages };
  }  
  return true;
};
