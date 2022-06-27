'use strict';
import Previewer from './Preview';

export default class IconHandler {
  static attachEachDeleteIcon(deleteIcon) {
    let rowTr;
    let that = this;
    deleteIcon.onclick = function() {
      let me = this;
      rowTr = me.parentElement; //TR WITH A RANDOM ID
      let tableIndex = rowTr.id.substring(5);
      while (rowTr.firstChild) {
        rowTr.removeChild(rowTr.firstChild);
        rowTr.style.display = 'none';
        rowTr.style.opacity = 0;
      }
      let data = that.data;
      data.splice(tableIndex, 1);
    };
  }

  static attachPreviewIcon(previewIcon) {
    let that = this;
    previewIcon.onclick = function() {
      let me = this;
      let rowTr = me.parentElement;
      //let previousData = rowTr.getElementsByTagName('td');
      let newBoard = document.createElement('div');
      while (rowTr.firstChild) {
        let content = rowTr.firstChild.innerHTML;
        let hr = document.createElement('hr');
        let div = document.createElement('div');
        div.appendChild(rowTr.firstChild);
        div.appendChild(hr);
        newBoard.appendChild(div);
      }
      let viewBoard = document.getElementById('contentView');
      viewBoard.appendChild(newBoard);
      that.viewMode(viewBoard);
    };
  }

  static attachEachEditIcon(editIconElement, formData) {
    let that = this;
    let submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('value', 'Send');
    submitBtn.style.padding = '20px';
    submitBtn.style.margin = '30px';
    submitBtn.style.borderRadius = '30px';
    submitBtn.style.backgroundColor = 'green';
    let rowTr;

    let FormBox = document.querySelector('form#content');
    let divBox = document.createElement('div');
    divBox.id = 'editmode';

    editIconElement.onclick = function() {
      let me = this;

      rowTr = me.parentElement.parentElement; //TR WITH A RANDOM ID
      //var previousData = rowTr.getElementsByTagName('td');
      let unEdited = rowTr.innerHTML;

      let tableIndex = rowTr.id.substring(5); //the table row id integer to delete
      let inputBox, inputBox2;
      let dataValues = Object.values(formData);
      let keyset = Object.keys(formData).map(function(item, index) {
        let divInner = document.createElement('div');

        divBox.style.backgroundColor = '#fff';
        divBox.appendChild(divInner);
      });

      divBox.appendChild(submitBtn);
      FormBox.appendChild(divBox);
      Previewer.previewEditMode(divBox);
      let indexOfRow = rowTr.id.substring(5);
      IconHandler.attachEachSubmitBtn(submitBtn, indexOfRow, FormBox);
    };
  }

  static attachEachSubmitBtn(submitElement, tableIndex, FormBox) {
    let that = this;
    that.tableIndex = tableIndex;
    //that.form = document.querySelector('form#content');
    FormBox.addEventListener('submit', function(e) {
      e.preventDefault();
      //get the form data in the edit button and
      //set the hash table of the data
      let localStorageEditData = {
        id: FormBox.querySelector('#id').value || that.genRandomId(),
        createdOn: FormBox.querySelector('#createdOn').value || '2022-12-12',
        firstname: FormBox.querySelector('#firstname2').value,

        createdBy: FormBox.querySelector('#createdBy').value,
        type: FormBox.querySelector('#type').value,
        longitude: FormBox.querySelector('#longitude').value,
        latitude: FormBox.querySelector('#latitude').value,
        status: FormBox.querySelector('#status').value,
        image: FormBox.querySelector('#image').value || './img/banners/c.jpg',
        video: FormBox.querySelector('#video').value || 'no video here',
        admin: FormBox.querySelector('#admin').value || false,
        story: FormBox.querySelector('#story2').value || 'nothing added',
      };
      //remove the old value in the local storage index
      that.data[that.tableIndex] = localStorageEditData;
      //console.log(that.data[that.tableIndex]);
      localStorage.setItem('items', JSON.stringify(that.data));
      window.location.reload();
      //TO DO : AUTO REFRESH WHEN EDIT IS DONE
      //Loading effect and animation
    });
  }
}
