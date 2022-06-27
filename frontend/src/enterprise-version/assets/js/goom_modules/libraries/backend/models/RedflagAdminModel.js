'use strict';
import InterventionModel from './InterventionAdminModel';

class RedflagAdminModel extends InterventionAdminModel {
  static getAllData() {
    return ApiBotServices.fetchDataInterventions('/red-flags');
  }
  //the rest is history
}
export default RedflagAdminModel;
