'use strict';
import ApiBotServices from '../../backend/services/postgres_api_bot';
//import AbstractModel from './AbstractModel';
class PlanCategoryModel {
  static getAllIndividualPlans() {
    return ApiBotServices.fetchDataIndividualPlans('/individual/plans/view');
  }

  static getAllCoperatePlans() {
    return ApiBotServices.fetchDataCoperatePlans('/coperate/plans/view');
  }

  static updateItem(record) {
    return ApiBotServices.updateItem(record);
  }

  static deleteItem(record) {
    return ApiBotServices.deleteItem(record);
  }
}
export default PlanCategoryModel;
