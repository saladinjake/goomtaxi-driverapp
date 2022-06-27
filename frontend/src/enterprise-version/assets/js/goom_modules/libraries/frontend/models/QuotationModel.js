'use strict';
import ApiBotServices from '../../backend/services/postgres_api_bot';
export default class QuotationModel{
	static getUsersQuotationTrnx(){
      return ApiBotServices.getUsersQuotationTrnx();
	}
}