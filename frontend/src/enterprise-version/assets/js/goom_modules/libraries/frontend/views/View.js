'use strict';
import ViewBuilder from './builder/ViewBuilder';

class View extends ViewBuilder {
  constructor() {
    super();
  }
  static Index(datas,locId) {
    return View.buildRecordUI(datas, locId);
  }

  static PaginatedView(data,locId) {
    return View.paginated(data,locId);
  }

  static Show(data) {
    return View.modalPreview(data);
  }

  static EditLocation(data, callBackSubmitHandler) {
    View.formLocationPreview(data);
    return callBackSubmitHandler();
  }

  static EditStatus(data, callBackSubmitHandler) {
    View.formStatusPreview(data);
    return callBackSubmitHandler();
  }

  static EditComment(data, callBackSubmitHandler) {
    View.formCommentPreview(data);
    return callBackSubmitHandler();
  }

  static Edit(data, callBackSubmitHandler) {
    View.formPreview(data);
    return callBackSubmitHandler();
  }

  static Create(callBackSubmitHandler) {
    View.formEntry();
    return callBackSubmitHandler();
  }

  static profilePage(promiseData, callBackSubmitHandler) {
    View.ShowProfile(promiseData)
    return callBackSubmitHandler();
  }
}

export default View;
