/* eslint-disable no-restricted-syntax */
const formDataToJson = (formData) => {
  if (!formData.entries) return JSON.stringify(formData);
  const form = {};
  for (const [fieldName, fieldValue] of formData.entries()) {
    form[fieldName] = fieldValue;
  }
  return JSON.stringify(form);
};

class Request {
  constructor(url, headers = {}) {
    this.url = url;
    this.headers = headers;
    this.fetchBody = {      
      headers: { 
        'Content-Type': 'application/json',
        ...this.headers 
      },
    };
  }

  post(data) {
    this.fetchBody = { 
      ...this.fetchBody,
      method: 'POST', 
      body: formDataToJson(data)
    };
    return this;
  }

  get() {
    return this;
  }

  param() {
    return this;
  }

  patch(data) {
    this.fetchBody = {
      headers: { 
        'Content-Type': 'application/json',
        ...this.headers 
      },
      method: 'PATCH',
      body: JSON.stringify(data)
    };
    return this;
  }

  async send() {
    return this.execute();
  }

  set() {
    return this;
  }
 
  async fetch() {
    return this.execute();
  }

  async execute() {
    console.log(this.fetchBody);
    const data = await fetch(this.url, this.fetchBody);
    return data.json();
  }
}

export default (url, headers) => new Request(url, headers);
