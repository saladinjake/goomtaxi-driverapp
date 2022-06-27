'use strict';
import appcounter from '../helpers/appcounter';
import UniqueId from '../helpers/uniqueId';

import RedFlagController from '../../frontend/controllers/Redflag';
class IReporterWebsiteRedFlagRecord extends  RedFlagController {
  attachEvents() {
    if (document.getElementById('admin')) {
      this.indexPageController();
      
      this.singleItemPageController();
      this.deleteRecordPageController();
      this.editLocationRecordPageController();
      this.editStatusRecordPageController();
      this.editCommentRecordPageController();
      this.saveNewRecordPageController();
    }
  }
  constructor() {
    super();
    this.tableIndex = null;
  }

  indexPageController() {
    let dataPromise = AdminInterventionModel.getBothRecord();
    return View.Index(dataPromise);
  }

  saveNewRecordPageController(){
    return super.saveNewRecordPageController()
  }

  singleItemPageController(){
    return super.singleItemPageController()
  }

  deleteRecordPageController() {
    return super.deleteRecordPageController() 
  }

   editLocationRecordPageController() {
     return super.editLocationRecordPageController() 
   }

   editCommentRecordPageController(){
     return super.editCommentRecordPageController()
   }

    editStatusRecordPageController() {
      return super.editStatusRecordPageController() 
    }

  
  attachPreviewIconToEventToShowContent(previewIconInt) {
    let that = this;
    previewIconInt.onclick = function() {
      let viewBoard = document.getElementById('contentView');
      Previewer.viewMode(viewBoard);
    };
  }
}

export default IReporterWebsiteRedFlagRecord;
