'use strict';
import HomeModel from '../models/HomeModel';
class WebsiteSingleRecord {
  constructor() {}

  attachEvents() {
    if (document.getElementById('plan-detail')) {
      this.indexPageController();
    }
  }

  indexPageController() {
    return HomeModel.dashboard();
  }
}

export default WebsiteSingleRecord;
