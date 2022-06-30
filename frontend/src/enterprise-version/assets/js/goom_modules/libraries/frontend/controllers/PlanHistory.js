'use strict';
import PlanHistoryModel from '../models/PlanHistoryModel';
import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection';
let baseUrl = getApiUrl();

class WebsitePlanHistory {
  constructor() {}

  attachEvents() {
    if (document.getElementById('plan-history')) {
      this.indexPageController();
    }
  }

  indexPageController() {
    return PlanHistoryModel.planHistory();
  }
}

export default WebsitePlanHistory;
