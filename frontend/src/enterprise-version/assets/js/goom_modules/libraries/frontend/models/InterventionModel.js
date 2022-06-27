'use strict';
import ApiBotServices from '../../backend/services/postgres_api_bot';
//import AbstractModel from './AbstractModel';
class InterventionModel {
  static getAllData() {
    let user = JSON.parse(localStorage.getItem('userToken'))
    return ApiBotServices.fetchDataInterventions(`/users/${user.user.account_num}/feedback`);
  }

  static getSpecificData() {
    return ApiBotServices.getById();
  }

  static submitFormData() {
    return ApiBotServices.submitFormData();
  }

  static deleteOneRecord() {
    return ApiBotServices.deleteOneRecord();
  }
  static updateOneLocation() {
    return ApiBotServices.updateOneLocation();
  }
  static updateOneComment() {
    return ApiBotServices.updateOneComment();
  }
  static updateOneStatus() {
    return ApiBotServices.updateOneStatus();
  }
}
export default InterventionModel;
