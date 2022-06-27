'use strict';
class Router {
  static redirect(page = 'login.html') {
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/') + 1);
    //alert(filename);
    if (localStorage.login == 'true') {
      window.location.href = 'index.html';
    } else if (localStorage.login == 'false' && filename != page) {
      window.location.href = page;
    }
  }

  static goTo(page){
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/') + 1);
    
      window.location.href = page;
    
  }
}

export default Router;
