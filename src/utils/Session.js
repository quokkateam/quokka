var Session;

class Sess {
  
  constructor() {
    this.header = 'quokka-user';
  }
  
  create(resp) {
    var token = resp.headers.get(this.header);
    
    if (token) {
      this.setCookie(this.header, token);
    } else {
      console.warn('Not creating session -- no token provided');
    }
  }

  destroy() {
    this.deleteCookie(this.header);
  }

  authed() {
    return !!this.getCookie(this.header);
  }

  isAdmin() {
    return false;
  }

  setCookie(name, value, days) {
    days = days || 30;
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires;
  }

  getCookie(name) {
    name = (name + '=') || '=';
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return '';
  }

  deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  }

  setToStorage (key, value) {
    var val;

    try {
      val = JSON.stringify(value);
    } catch (e) {
      val = value;
    }

    localStorage.setItem(key, val);
  }

  getFromStorage (key) {
    var item;
    var data = localStorage.getItem(key);

    try {
      item = JSON.parse(data);
    } catch (e) {
      item = data;
    }

    return item;
  }

  deleteFromStorage (key) {
    localStorage.removeItem(key);
  }

  userName() {
    return (this.getFromStorage('user') || {}).name || 'BW';
  }
}

function getInstance() {
  if (!Session) {
    Session = new Sess();
  }
  
  return Session;
}

export default getInstance();