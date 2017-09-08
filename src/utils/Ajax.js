/*
  Wrapper around whatwg-fetch for making ajax requests

  Usage example (no usage difference between get/post/put/delete):

    Ajax.get('/api/users', { company: 'My Company' })
      .then((resp) => resp.json()) // unpack json response data
      .then((data) => {
        console.log(data);
      });
 */

import $ from 'jquery';
import Session from './Session';

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

    return fetch(url, {
      method: method,
      credentials: 'same-origin'
    });
  }

  jsonRequst(url, params, method) {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
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