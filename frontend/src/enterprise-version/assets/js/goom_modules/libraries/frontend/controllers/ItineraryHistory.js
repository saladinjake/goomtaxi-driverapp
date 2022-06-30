'use strict';
import ItineraryHistoryModel from '../models/ItineraryHistoryModel';
class WebsiteItineraryHistory {
  constructor() {}

  attachEvents() {
    if (document.getElementById('itinerary-history')) {
      this.indexPageController();
    }
  }

  indexPageController() {
    return ItineraryHistoryModel.itineraryHistory();
  }
}

export default WebsiteItineraryHistory;
