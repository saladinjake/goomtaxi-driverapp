'use strict';
import ApiBotServices from '../../backend/services/postgres_api_bot';
class UserProfileModel{
	constructor(){}

  static fetchUserProfile() {
    return ApiBotServices.fetchUserProfile();
  }

 
  static updateProfile() {
    return ApiBotServices.updateProfile();
  }

  static deleteOneProfileRecord() {
    return ApiBotServices.deleteOneProfileRecord();
  }
 
}

export default UserProfileModel;