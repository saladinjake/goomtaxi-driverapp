'use strict';
import ApiBotServices from '../../backend/services/postgres_api_bot';
export default class PaymentModel{
	static getUsersTrnx(){
      return ApiBotServices.getUsersPaymentTrnx();
	}
}