'use strict';
import ApiBotService from '../services/postgres_api_bot';
//import ApiAdminBots from '../services/adminservices/postgres_api_admin_bot';
import AdminBash from '../services/adminservices/AdminBash';

class AdminModel {
  constructor() {}

  static runEndpoints() {
    console.log('called admin');
    return AdminBash.runEndpoints();
  }
}
export default AdminModel;
