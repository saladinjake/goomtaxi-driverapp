'use strict';
import ApiBotServices from '../../backend/services/postgres_api_bot';
export default class DriversAssignementModel {
  static getAssignedCarsAndTrips() {
    return ApiBotServices.getAssignedCarsAndTrips();
  }
}
