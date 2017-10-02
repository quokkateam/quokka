import Cookies from 'universal-cookie';

var Session;

class Sess {
  
  constructor() {
    this.header = 'quokka-user';
    this.cookies = new Cookies();
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
    this.deleteFromStorage('user');
    this.deleteFromStorage('school');
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

  getCookie(name) {
    return this.cookies.get(name);
  }

  setCookie(name, value) {
    this.cookies.set(name, value, { path: '/' });
  }

  deleteCookie(name) {
    this.cookies.remove(name);
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