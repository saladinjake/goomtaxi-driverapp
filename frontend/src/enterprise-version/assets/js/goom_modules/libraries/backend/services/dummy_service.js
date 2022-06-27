'use strict';
import TableBuilder from '../helpers/TableBuilder';

export default class LocalStorageRedflagService {
  constructor() {
    this.itemsArray = this.fetchData();
    localStorage.setItem('items', JSON.stringify(this.itemsArray));
    this.data = JSON.parse(localStorage.getItem('items'));
    this.form = document.querySelector('form#add-redflag');
  }

  fetchData() {
    return localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  }
  getById(id) {
    this.data.filter(item => {
      return item.id == parseInt(id, 10);
    });
  }
  editRecord(id, editData = {}) {
    const redFlag = this.getById(id);
    Object.assign(redFlag, editData);
    const redFlagId = this.data.find(item => item.id === parseInt(id, 10));
    const index = this.data.indexOf(redFlagId);
    this.data.splice(index, 1);
    this.itemsArray.push(redFlag);
    localStorage.setItem('items', JSON.stringify(this.itemsArray));
  }
  deleteRecord(id) {
    const redFlagId = this.data.find(item => item.id === parseInt(id, 10));
    const index = this.data.indexOf(redFlagId);
    this.data.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.data));
  }
  genRandomId() {
    return Math.floor(Math.random() * 9000 + 2000);
  }
  saveToLocalStorage(localStorageDataRed = {}) {
    let that = this;
    // that.form.addEventListener('submit', function (e) {
    // e.preventDefault();
    // let localStorageDataRed = {
    //   id: document.getElementById('identity2').value || that.genRandomId(),
    //   createdOn: document.getElementById('created2').value,
    //   firstname: document.getElementById('firstname2').value,
    //   createdBy: document.getElementById('user2').value ,
    //   type: document.getElementById('recordtype2').value || 'redflag',
    //   longitude: document.getElementById('lat2').value ,
    //   latitude: document.getElementById('lng2').value,
    //   status: document.getElementById('status2').value ,
    //   image: document.getElementById('imgEvidence2').value || './img/banners/c.jpg',
    //   video: document.getElementById('vidEvidence2').value || './img/banners/c.jpg',
    //   admin: document.getElementById('approved2').value ,
    //   story : document.getElementById('story2').value
    // };
    //  });

    that.itemsArray.push(localStorageDataRed);
    localStorage.setItem('items', JSON.stringify(that.itemsArray));
    TableBuilder.buildTableRows(localStorageDataRed);
  }
}
