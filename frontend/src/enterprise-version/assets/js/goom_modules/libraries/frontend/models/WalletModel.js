'use strict';
import ApiBotServices from '../../backend/services/postgres_api_bot';
export default class WalletModel {
  static getUsersTrnx() {
    return ApiBotServices.getUsersTrnx();
  }
}
