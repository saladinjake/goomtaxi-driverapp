'use strict';
export default class ModalPremier {
  static previewEditMode(div) {
    let modal = document.getElementById('myModaleditor');
    let captionText = document.getElementById('captionEdit');
    modal.style.display = 'block';
    // captionText.innerHTML = 'EDITING ' + div.id;
    // let span = document.getElementById("closer");
    // span.onclick = function() {
    //   modal.style.display = "none";
    // }
  }
  static viewMode(div) {
    let that = this;
    let modal = document.getElementById('myModalpreviewer');
    let captionText = document.getElementById('captionView');
    modal.style.display = 'block';
    captionText.innerHTML = ' Viewing' + div.id;
    let span = document.getElementById('closerNote');
    span.onclick = function() {
      modal.style.display = 'none';
      //that.viewRecord('demo');
    };
  }
}
