'use strict';
import ModalPremier from './ModalPremier';
import TableBuilder from './TableBuilder';

class Previewer {
  static previewEditMode(div) {
    ModalPremier.previewEditMode(div);
  }
  static viewMode(div) {
    ModalPremier.viewMode(div);
  }
  static viewRecord(data, displayGround) {
    data.forEach(dataform => {
      TableBuilder.buildTableRows(dataform, displayGround);
    });
  }
}

export default Previewer;
