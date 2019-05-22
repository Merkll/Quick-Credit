class Request {
  constructor(url, headers = {}) {
    this.url = url;
    this.headers = headers;
    this.fetchBody = {};
  }

  post(data) {
    this.fetchBody = {
      headers: { 
        'Content-Type': 'application/json',
        ...this.headers 
      },
      method: 'POST',
      body: JSON.stringify(data)
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
    const data = await fetch(this.url, this.fetchBody);
    return data;
  }
}

export default (url, headers) => new Request(url, headers);
