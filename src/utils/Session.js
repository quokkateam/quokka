var Session;

class Sess {
  
  constructor() {
    this.header = 'quokka-user';
  }
  
  create(resp, cb) {
    var token = resp.headers.get(this.header);
    
    if (token) {
      this.setCookie(this.header, token);

      resp.json().then((data) => {
        this.setToStorage('user', data.user);
        this.setToStorage('school', data.school);
        cb();
      });
    } else {
      console.warn('Not creating session -- no token provided');
      cb();
    }
  }

  destroy() {
    this.deleteCookie(this.header);
  }

  authed() {
    return !!this.getCookie(this.header);
  }

  user() {
    return this.getFromStorage('user');
  }

  school() {
    return this.getFromStorage('school');
  }

  isAdmin() {
    return !!(this.user() || {}).isAdmin;
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

  getUserInitials() {
    var user = this.user();

    if (!user || !user.name || !user.name.trim()) {
      return '';
    }

    var splitName = user.name.split(' ');

    if (splitName.length === 1) {
      return user.name[0].toUpperCase();
    }

    var firstName = splitName[0];
    var lastName = splitName[splitName.length - 1];

    return firstName[0].toUpperCase() + lastName[0].toUpperCase();
  }
}

function getInstance() {
  if (!Session) {
    Session = new Sess();
  }
  
  return Session;
}

export default getInstance();