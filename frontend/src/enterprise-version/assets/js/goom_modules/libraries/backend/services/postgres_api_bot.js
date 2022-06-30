'use strict';
import ApiLoginService from './apiservices/ApiLoginService';
import ApiSignUpService from './apiservices/ApiSignUpService';
import ApiGetAllRecord from './apiservices/ApiGetAllRecord';
import ApiGetOneRecord from './apiservices/ApiGetOneRecord';
import ApiSaveOneRecord from './apiservices/ApiSaveOneRecord';
import ApiSOSRequest from './apiservices/ApiSOSRequest';
import ApiDeleteOneStatusRecord from './apiservices/ApiDeleteOneStatusRecord';
import ApiProfile from './apiservices/ApiUserProfile';
import ApiDashboard from './apiservices/ApiDashboard';
import ApiItineraryHistory from './apiservices/ApiItineraryHistory';
import ApiPlanHistory from './apiservices/ApiPlanHistory';
import ApiFaqs from './apiservices/ApiGetAllFaqs';
import ApiUsersSOS from './apiservices/ApiUsersSOS';
import ApiWallet from './apiservices/ApiWallet';
import ApiQuotation from './apiservices/ApiQuotation';
import ApiPayments from './apiservices/ApiPayments';
import ApiMech from './apiservices/ApiMech';
import ApiAllPlansCategory from './apiservices/ApiAllPlansCategory';

/**perform update per routes*/

import ApiUpdateOneRecord from './apiservices/ApiUpdateOneRecord'; //code script powered up update
import ApiEditOneCommentRecord from './apiservices/ApiEditOneCommentRecord';
import ApiUpdateStatusRecord from './apiservices/ApiUpdateStatusRecord';
import ApiGetBothRecord from './apiservices/ApiGetBothRecord'; //for admin
import ApiAllUsersRecords from './apiservices/ApiAllUsersRecords';

import ApiDriversTasks from './apiservices/ApiDriversTasks';

var cache = {};
function onlyAllowOneCall(fn) {
  var hasBeenCalled = false;
  return function() {
    if (hasBeenCalled) {
      throw Error('Attempted to call callback twice');
    }
    hasBeenCalled = true;
    return fn.apply(this, arguments);
  };
}

class ApiBotService {
  constructor() {}

  static getAssignedCarsAndTrips() {
    return ApiDriversTasks.getAssignedCarsAndTrips();
  }
  static dashboard() {
    return ApiDashboard();
  }

  static itineraryHistory() {
    return ApiItineraryHistory();
  }

  static planHistory() {
    return ApiPlanHistory();
  }
  static authenticateUser() {
    return ApiLoginService.validate();
  }

  static passwordReset() {
    return ApiLoginService.passwordReset();
  }

  static authorizeUser() {
    return ApiSignUpService.authorize();
  }

  static fetchUserProfile() {
    return ApiProfile.fetchUserProfile();
  }

  static updateProfile() {
    return ApiProfile.updateProfile();
  }

  static fetchDataIndividualPlans(url = '/individual/plans/view') {
    return ApiAllPlansCategory.getData(url);
  }

  static fetchDataCoperatePlans(url = '/coperate/plans/view') {
    return ApiAllPlansCategory.getData(url);
  }

  static deleteItem(record) {
    return ApiAllPlansCategory.deleteItem(record);
  }

  static updateItem(record) {
    return ApiAllPlansCategory.updateItem(record);
  }

  static getOnePlanById() {
    return ApiAllPlansCategory.getOnePlanById();
  }

  static fetchDataInterventions(url = '/interventions') {
    return ApiGetAllRecord.getData(url);
  }

  static fetchDataRedFlags(url = '/sos') {
    return ApiGetAllRecord.getData(url);
  }

  static getAllUsersSOS() {
    return ApiUsersSOS.getDataById();
  }

  static getAllFaqs() {
    return ApiFaqs.getAllFaqs();
  }

  static getUsersRepairs() {
    return ApiMech.getUsersRepairs();
  }

  static saveRepairs() {
    return ApiMech.saveRepairs();
  }

  static saveSOSRequest(user) {
    console.log('calling');
    return ApiSOSRequest.saveSOSRequest(user);
  }

  static updateOneRecord(record) {
    return ApiUpdateOneRecord.updateOneRecord(record);
  }

  static getById() {
    return ApiGetOneRecord.getDataById();
  }

  static submitFormData() {
    return ApiSaveOneRecord.triggerEvents();
  }

  static deleteOneRecord() {
    return ApiDeleteOneStatusRecord.deleteDataById();
  }

  static updateOneComment() {
    return ApiEditOneCommentRecord.editOneCommentById();
  }
  static updateOneStatus() {
    return ApiUpdateStatusRecord.updateOneStatus();
  }

  static fetchBothRecords() {
    return ApiGetBothRecord.getData();
  }

  static getUsersTrnx() {
    return ApiWallet.getUsersTrnx();
  }

  static getUsersQuotationTrnx() {
    return ApiQuotation.getUsersQuotationTrnx();
  }

  static getUsersPaymentTrnx() {
    return ApiPayments.getUsersPaymentTrnx();
  }

  static getCurrentUsersPosts() {
    return ApiAllUsersRecords.getData();
  }

  genRandomId() {
    return Math.floor(Math.random() * 9000 + 2000);
  }

  //ADMIN

  static runAllGetRecords() {
    return ApiAdminBotService.runAllGetRecords();
  }
}

export default ApiBotService;
