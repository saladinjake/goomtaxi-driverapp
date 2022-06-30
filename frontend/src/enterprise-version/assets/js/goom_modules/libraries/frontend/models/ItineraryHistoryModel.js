import ApiBotServices from '../../backend/services/postgres_api_bot';
class ItineraryHistoryModel {
  constructor() {}

  static itineraryHistory() {
    return ApiBotServices.itineraryHistory();
  }
}

export default ItineraryHistoryModel;
