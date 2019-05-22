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
