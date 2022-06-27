'use strict';
import InterventionModel from './InterventionModel';
import ApiBotServices from '../../backend/services/postgres_api_bot';
class RedflagModel extends InterventionModel {
  constructor(){
  	super()
  }
  static getAllData() {
    return ApiBotServices.fetchDataRedFlags('/red-flags');
  }
  //the rest is history if you understand oop inheritance
}
export default RedflagModel;
