import $ from 'jquery';

var Ajax;

class AjaxClass {

  get(url, params) {
    return this.urlEncoded(url, params, 'GET');
  }

  post(url, params) {
    return this.jsonRequst(url, params, 'POST');
  }

  put(url, params) {
    return this.jsonRequst(url, params, 'PUT');
  }

  delete(url, params) {
    return this.urlEncoded(url, params, 'DELETE');
  }

  urlEncoded(url, params, method) {
    if (params) {
      url += ('?' + $.param(params));
    }

    return fetch(url, { method: method });
  }

  jsonRequst(url, params, method) {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params || {})
    });
  }
}

function getInstance() {
  if (!Ajax) {
    Ajax = new AjaxClass();
  }

  return Ajax;
}

export default getInstance();