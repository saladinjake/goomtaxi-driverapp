'use strict';
class ViewPreviledge {
  constructor() {}

  static hasActionPreviledges(ViewElement, userId, reportUserId) {
    if (ViewPreviledge.checkUserExist() === false) {
      ViewElement.setAttribute('style', 'display:none;');
    } else {
      if (userId == reportUserId) {
        ViewElement.setAttribute('style', 'display:block;');
      } else {
        ViewElement.setAttribute('style', 'display:none;');
      }
    }
  }

  static checkUserExist() {
    const user = JSON.parse(localStorage.getItem('userToken'));
    if (!user) {
      return false;
    }

    return true;
  }

  static getLoggedInUser() {
    const user = JSON.parse(localStorage.getItem('userToken'));
    if (!user) {
      return false;
    }
    console.log(JSON.stringify(user));
    return user;
  }
}

export default ViewPreviledge;
