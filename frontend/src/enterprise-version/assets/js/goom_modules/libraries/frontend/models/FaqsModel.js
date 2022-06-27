'use strict';
import ApiBotServices from '../../backend/services/postgres_api_bot';
//import AbstractModel from './AbstractModel';
class FaqsModel {
  static getAllFaqs() {
    return ApiBotServices.getAllFaqs();
  }

  
}
export default FaqsModel;
