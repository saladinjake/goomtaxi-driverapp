'use strict';
import ViewBuilder from './ViewBuilder';

class Paginator {
  constructor(data, locId) {
    this.data = data;
    //console.log('me---' + data);
    this.pageSize = 5;
    this.pageNum = 0;
    this.locId = locId;
  }

  static hasClass(el, classname) {
    return el.classList.contains(classname);
  }

  attachEvents() {
    let that = this;

    let documentDom = document;
    documentDom.addEventListener(
      'click',
      e => {
        if (Paginator.hasClass(e.target, 'lefty')) {
          console.log('clicked');
          e.preventDefault();
          that.previousPage();
        } else if (Paginator.hasClass(e.target, 'righty')) {
          console.log('clicked');
          e.preventDefault();
          that.nextPage();
        }
      },
      false,
    );
  }
  nextPage() {
    this.pageNum++;
    this.data = this.loadRecordData();
    console.log(this.data);

    return ViewBuilder.buildRecordUI(this.data, this.locId);
  }

  previousPage() {
    this.pageNum--;
    this.data = this.loadRecordData();
    console.log(this.data);

    return ViewBuilder.buildRecordUI(this.data, this.locId);
  }

  loadRecordData() {
    return (this.data = this.data.slice(
      this.pageNum * this.pageSize,
      (this.pageNum + 1) * this.pageSize,
    ));
  }
}

export default Paginator;
