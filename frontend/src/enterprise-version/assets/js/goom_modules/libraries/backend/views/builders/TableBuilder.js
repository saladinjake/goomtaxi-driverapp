'use strict';
import IconHandler from './IconHandler';
import IReporterWebsiteImageViewer from './imageviewer';
import appcounter from '../../helpers/appcounter';

export default class TableBuilder {
  static buildTableRows(displayData, displayGround) {
    let that = this;
    let tbody = displayGround;
    let button = document.querySelector('button.destroy2');
    let tableIndex = null;

    const tr = document.createElement('tr');
    tr.id = 'fable' + appcounter.counter();
    let td;

    console.log(displayData + 'looke into ');

    let values = Object.values(displayData);
    let keys = Object.keys(displayData).map(function(item, index) {
      console.log(item);
      if (item === 'images') {
        // the next item video is actually the img

        td = document.createElement('td');
        let img = document.createElement('img');
        img.src = './UI/images/' + 'b.jpg'; //formData[item];
        img.style.width = '50px';
        img.style.height = '50px';

        img.setAttribute('class', 'img-evidence');
        img.onclick = function() {
          return new IReporterWebsiteImageViewer().tableImagePreviewer();
        };

        td.appendChild(img);
        tr.appendChild(td);
      } else if (item === 'videos') {
        // the next item video is actually the img

        td = document.createElement('td');
        let vid = document.createElement('video');
        vid.src = './UI/videos/' + 'a.mp4'; //formData[item];
        vid.style.width = '50px';
        vid.style.height = '50px';

        vid.setAttribute('class', 'img-evidence');
        vid.onclick = function() {
          return new IReporterWebsiteImageViewer().tableImagePreviewer();
        };

        td.appendChild(vid);
        tr.appendChild(td);
      } else {
        td = document.createElement('td');
        td.textContent = displayData[item];
        //console.log(formData[item]);
        tr.appendChild(td);
      }
    });

    let iconTd = document.createElement('td');
    let editIcon = document.createElement('i');
    editIcon.setAttribute('class', 'editor fa fa-edit');
    editIcon.innerHTML = 'edit';
    iconTd.appendChild(editIcon);
    tr.appendChild(iconTd);
    let previewIcon = document.createElement('td');
    previewIcon.innerHTML = "<i class='fa fa-eye' data-perform='panel-refresh'> view</i>";
    tr.appendChild(previewIcon);
    let deleteIcon = document.createElement('td');
    deleteIcon.id = 'del' + tr.id; //to determine which t delete
    deleteIcon.setAttribute('title', tr.id);
    deleteIcon.innerHTML = "<i onclick='' class='fa fa-trash'>delete</i>";
    tr.appendChild(deleteIcon);
    tbody.appendChild(tr);
    IconHandler.attachEachEditIcon(editIcon, displayData);
    IconHandler.attachEachDeleteIcon(deleteIcon);
    IconHandler.attachPreviewIcon(previewIcon);
  }
}
