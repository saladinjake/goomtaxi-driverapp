import ApiBotServices from '../../backend/services/postgres_api_bot';
class PlanHistoryModel {
  constructor() {}

  static planHistory() {
    return ApiBotServices.planHistory();
  }
}

export default PlanHistoryModel;
