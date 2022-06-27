'use strict';
class IReporterWebsiteUser {
  attachEvents() {}
  constructor() {
    this.id = null;
    this.username = null;
    this.firstname = null;
    this.lastname = null;
    this.othernames = null;
    this.email = null;
    this.phone = null;
    this.isadmin = false;
    this.isLoggedIn = false;
  }

  getUsername() {
    //from local storage to show which user is logged in
    //then search the local storage to fill all the user data properties
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  fetchUserDataOnLogin() {}

  attachEvents() {}
}
export default IReporterWebsiteUser;
