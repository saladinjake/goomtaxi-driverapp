'use strict';
import PaginatedView from './Paginator';
import ViewPreviledge from './ViewPreviledge';

class ViewBuilder {
  constructor() {}

  static paginated(dataToTiew, locId) {
    console.log(dataToTiew);
    let paginatedData = new PaginatedView(dataToTiew,locId);

    let data = paginatedData.loadRecordData();
    console.log(data);

    paginatedData.attachEvents();

    return ViewBuilder.buildRecordUI(data,locId);
  }
  static buildRecordUI(dataToTiew, locId) {
    let that = this;
     let rootTemplate = document.getElementById(locId);
     let divTemplate = document.createElement('div');
    if (document.getElementById(locId)) {
      console.log("type of data is " + typeof dataToTiew)
     
      let i;
      let templateString;
      console.log(dataToTiew);
      let recordData = dataToTiew;
      
      divTemplate.id = 'products';
      let divUl = document.createElement('ul');

      if (document.getElementById('show-cats')) {
        let showCats = document.getElementById('show-cats');

        let cats = document.getElementById('categories');
        //products = document.getElementsByClassName( "product" ),
        let wrapper = divTemplate;

        showCats.addEventListener('click', function() {
          cats.classList.toggle('visible');
          wrapper.classList.toggle('resize');
          return false;
        });
      }

      if (recordData.length === 0) {
        divTemplate.innerHTML = 'No records Yet';
        divTemplate.style.textAlign = 'center';
      } else {
        recordData.forEach((item, index) => {
          ViewBuilder.generateView(divUl, item, index);
        });
      }
      divTemplate.appendChild(divUl);
      rootTemplate.appendChild(divTemplate);
    }

  }

  static generateView(divUl, item, index) {
    let detail = document.createElement('li');
    detail.setAttribute('class', 'product');
    detail.class = 'product';
    detail.setAttribute('style', '');
    //detail.style.padding = '20px';
    //detail.style.width = '33.33%';
    detail.id = 'box_view_' + index;
    console.log(detail.id + 'here');

    ViewPreviledge.hasActionPreviledges(
      detail,
      ViewPreviledge.getLoggedInUser().user.id,
      item.user_id,
    );

    ViewBuilder.generateContent(detail, item);
    ViewBuilder.generateEditIcon(detail, item);
    ViewBuilder.generateReadMore(detail, item);
    ViewBuilder.generateDeleteIcon(detail, item);



    divUl.appendChild(detail);
    //return divUl;
  }

  static generateContent(detailDiv, item) {
    let figure = document.createElement('figure');
    figure.setAttribute('class', 'circle');
    let HeadingTag = document.createElement('a');
    HeadingTag.setAttribute('class', 'left update_loc_icon');
    HeadingTag.innerHTML = item.location;
    HeadingTag.href = '#';

    HeadingTag.onclick = function(e) {
      e.preventDefault();
      console.log('want to change loc');
      localStorage.setItem('Id', item.id);
      localStorage.setItem('reportType', item.reportType);
      localStorage.setItem('mode', 'editMode');
    };
    let TitleTag = document.createElement('a');

    HeadingTag.setAttribute(
      'style',
      `width:80px; height:30px;
      background-color: red;
      padding:3px;

      
  -webkit-box-shadow: 4px 4px 4px #ccc;
  -moz-box-shadow: 4px 4px 4px #ccc;
  box-shadow: 4px 4px 4px #ccc;
      `,
    );

    TitleTag.innerHTML = item.status;
    TitleTag.setAttribute('class', 'right update_status_icon');
    TitleTag.href = '#';
    TitleTag.onclick = function(e) {
      e.preventDefault();
      localStorage.setItem('Id', item.id);
      localStorage.setItem('reportType', item.reportType);
      localStorage.setItem('mode', 'editMode');
    };

    TitleTag.setAttribute(
      'style',
      `width:80px; height:30px;
      background-color: red;
      padding:3px;
      
  -webkit-box-shadow: 4px 4px 4px #ccc;
  -moz-box-shadow: 4px 4px 4px #ccc;
  box-shadow: 4px 4px 4px #ccc;
      `,
    );
    let clearTag = document.createElement('div');
    clearTag.setAttribute('class', 'clearfix');
    figure.appendChild(HeadingTag);
    figure.appendChild(TitleTag);

    ViewPreviledge.hasActionPreviledges(
      HeadingTag,
      ViewPreviledge.getLoggedInUser().user.id,
      item.user_id,
    );

    ViewPreviledge.hasActionPreviledges(
      TitleTag,
      ViewPreviledge.getLoggedInUser().user.id,
      item.user_id,
    );

    figure.appendChild(clearTag);
    console.log(typeof item.images);
    let imageSlider = document.createElement('div');
    if (item.images.length) {
      console.log(item.images.slice(0, 1));
      ViewBuilder.buildHtmlImages(item.images).forEach((DivSlider, index) => {
        console.log('switch the image to card now ' + DivSlider);

        let newImage = document.createElement('img');
        newImage.setAttribute('class', 'item');
        newImage.setAttribute('id', 'showme_' + index);
        if (newImage.getAttribute('id') == 'showme_0') {
          newImage.setAttribute('alt', 'no image preview');
          newImage.style.height = '200px';
          newImage.style.width = '200px';
          newImage.style.margin = '0px auto';

          newImage.src = DivSlider.getAttribute('data-image');
          imageSlider.appendChild(newImage);
        } else {
          // hide the rest
        }
      });
    }
    let videoSlider = document.createElement('div')
    if(item.videos.length){
      ViewBuilder.buildHtmlVideos(item.videos).forEach((DivSlider, index) =>{
        let newVideo = document.createElement('video');
        newVideo.setAttribute('class', 'item');
        newVideo.setAttribute('id', 'showvod_' + index);
        if (newVideo.getAttribute('id') == 'showvod_0') {
          //newImage.setAttribute('alt', 'no image preview');
          newVideo.style.height = '200px';
          newVideo.style.width = '200px';
          newVideo.style.margin = '0px auto';

          newVideo.src = DivSlider.getAttribute('data-image');
          videoSlider.appendChild(newVideo);
        } else {
          // hide the rest
        }
      })
    }

    let BodyContentTag = document.createElement('a');
    BodyContentTag.setAttribute('class', 'update_comment_icon');
    BodyContentTag.innerHTML = ViewBuilder.shortStory(item.comment, 30);
    BodyContentTag.href = '#';
    BodyContentTag.style.textAlign = 'center';
    BodyContentTag.onclick = function(e) {
      e.preventDefault();
      localStorage.setItem('Id', item.id);
      localStorage.setItem('reportType', item.reportType);
      localStorage.setItem('mode', 'editMode');
    };
    let figureCaption = document.createElement('figcaption');
    figure.appendChild(imageSlider);
    figureCaption.appendChild(BodyContentTag);
    figure.appendChild(figureCaption);

    //figure.appendChild(videoSlider)

    ViewPreviledge.hasActionPreviledges(
      BodyContentTag,
      ViewPreviledge.getLoggedInUser().user.id,
      item.user_id,
    );

    detailDiv.appendChild(figure);
  }

  static generateReadMore(detailDiv, item) {
    console.log(item.id + 'here...');
    let readMore = document.createElement('div');
    readMore.setAttribute('class', 'read_more');
    readMore.setAttribute('id', item.id);
    readMore.innerHTML = 'read more...';
    readMore.onclick = function() {
      localStorage.setItem('Id', item.id);
      localStorage.setItem('reportType', item.reportType);
      localStorage.setItem('mode', 'viewMode');
      console.log(localStorage.getItem('Id'));
    };
    detailDiv.appendChild(readMore);

    readMore.setAttribute(
      'style',
      `width:80px; height:30px;
      background-color: red;
      padding:3px;
      position: absolute;
      margin:0px auto;
      top:150px;
      left: 150px;
      
  -webkit-box-shadow: 4px 4px 4px #ccc;
  -moz-box-shadow: 4px 4px 4px #ccc;
  box-shadow: 4px 4px 4px #ccc;
      `,
    );
  }

  static generateEditIcon(detailDiv, item) {
    let editIcon = document.createElement('div');
    editIcon.setAttribute('class', 'edit_icon left');
    editIcon.setAttribute('id', item.id);
    editIcon.innerHTML = 'Edit';
    editIcon.onclick = function() {
      localStorage.setItem('Id', item.id);
      localStorage.setItem('reportType', item.reportType);
      localStorage.setItem('mode', 'editMode');
      //console.log(localStorage.getItem('Id'))
    };
    detailDiv.appendChild(editIcon);

    ViewPreviledge.hasActionPreviledges(
      editIcon,
      ViewPreviledge.getLoggedInUser().user.id,
      item.user_id,
    );

    editIcon.setAttribute(
      'style',
      `width:80px; height:30px;
      background-color: red;
      padding:3px;

      
      
  -webkit-box-shadow: 4px 4px 4px #ccc;
  -moz-box-shadow: 4px 4px 4px #ccc;
  box-shadow: 4px 4px 4px #ccc;
      `,
    );
  }

  static generateDeleteIcon(detailDiv, item) {
    let deleteIcon = document.createElement('div');
    deleteIcon.setAttribute('class', 'delete_icon right');
    deleteIcon.setAttribute('id', item.id);
    deleteIcon.innerHTML = 'Delete';
    deleteIcon.onclick = function() {
      localStorage.setItem('Id', item.id);
      localStorage.setItem('reportType', item.reportType);
      localStorage.setItem('mode', 'deleteMode');

      detailDiv.classList.add('hiddenOnDelete');
      //console.log(localStorage.getItem('Id'))
    };
    detailDiv.appendChild(deleteIcon);

    ViewPreviledge.hasActionPreviledges(
      deleteIcon,
      ViewPreviledge.getLoggedInUser().user.id,
      item.user_id,
    );

    deleteIcon.setAttribute(
      'style',
      `width:80px; height:30px;
      background-color: red;
      padding:3px;

      
      
  -webkit-box-shadow: 4px 4px 4px #ccc;
  -moz-box-shadow: 4px 4px 4px #ccc;
  box-shadow: 4px 4px 4px #ccc;
      `,
    );
  }

  static shortStory(string, maxWords) {
    if (string) {
      let strippedString = string;
      let result = strippedString.substring(0, maxWords);
      return result;
    }
    return 'short story here';
  }
  static buildHtmlImages(images) {
    let allImgEl = [];
    if (images.length === 0) {
      return 'No Image Uploaded';
    }
    let rawData = images;
    console.log(typeof rawData + '  ' + rawData);
    let displayImage = rawData.split(',');

    console.log(displayImage.length + ' ' + typeof displayImage);
    console.log(JSON.stringify(displayImage));

    let count = 1;
    Object.values(displayImage).map(function(img) {
      let imgData = img.replace(/{/, '').replace(/}/, '');
      console.log(imgData + ' stripping');
      if (imgData.charAt(0) === '"' && imgData.charAt(imgData.length - 1)) {
        imgData = `http://localhost:4000/UI/images/${imgData.substr(1, imgData.length - 2)}`;
      }
      console.log('string data:' + imgData);
      console.log('this is the uploaded data ' + imgData);
      let ImageSlide = document.createElement('div');

      ImageSlide.setAttribute('id', 'slide-' + count);
      ImageSlide.setAttribute('class', 'slide');
      ImageSlide.setAttribute('data-image', `${imgData}`);
      ImageSlide.setAttribute('style', `background-image: url("${imgData}"); opacity: 1;`);
      count = count + 1;
      //ImageSlide.setAttribute("alt", "no image preview")
      allImgEl.push(ImageSlide);
    });

    console.log(allImgEl);
    return allImgEl;
  }

  static buildHtmlVideos(videos) {
    let allVidEl = [];
    if (videos.length === 0) {
      return 'No Image Uploaded';
    }
    let rawData = videos;
    console.log(typeof videos + '  ' + rawData);
    let displayImage = rawData.split(',');

    console.log(displayImage.length + ' ' + typeof displayImage);
    console.log(JSON.stringify(displayImage));

    let count = 1;
    Object.values(displayImage).map(function(img) {
      let imgData = img.replace(/{/, '').replace(/}/, '');
      console.log(imgData + ' stripping');
      if (imgData.charAt(0) === '"' && imgData.charAt(imgData.length - 1)) {
        imgData = `https://goomtaxiuser.herokuapp.com/UI/images/${imgData.substr(1, imgData.length - 2)}`;
      }
      console.log('string data:' + imgData);
      console.log('this is the uploaded data ' + imgData);
      let ImageSlide = document.createElement('div');

      ImageSlide.setAttribute('id', 'slide-' + count);
      ImageSlide.setAttribute('class', 'slide');
      ImageSlide.setAttribute('data-image', `${imgData}`);
      ImageSlide.setAttribute('style', `background-image: url("${imgData}"); opacity: 1;`);
      count = count + 1;
      //ImageSlide.setAttribute("alt", "no image preview")
      allVidEl.push(ImageSlide);
    });

    console.log(allVidEl);
    return  allVidEl;
  }

  static modalPreview(data) {
    console.log('calling a modal');
    let that = this;

    //   // Get the modal
    let modal = document.getElementById('myModalviewer');

    // Get the images it inside the modal - use its "alt" text as a caption
    let slideImageContent = document.getElementById('imageSlides');

    if (data.images.length) {
      ViewBuilder.buildHtmlImages(data.images).forEach(img => {
        //console.log(img)
        slideImageContent.appendChild(img);
      });
    }

    var videoSlides = document.getElementById('videoSlides');
    if(data.videos.length){
      ViewBuilder.buildHtmlVideos(data.videos).forEach((vid) =>{
                //console.log(img)
        videoSlides.appendChild(vid);
      })
    }

    let captionText = document.getElementById('captionView');

    modal.style.display = 'block';

    captionText.innerHTML = '<h1 style=""> Viewing</h1><div>' + data.comment + '</div>';

    // Get the <span> element that closes the modal
    let span = document.getElementById('closerNote');
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
      slideImageContent.innerHTML = '';
      videoSlides.innerHTML = '';
    };
  }

  static formLocationPreview(data) {
    console.log('calling a location edit modal');

    //   // Get the modal
    let modal = document.getElementById('myModalLocation');
    modal.style.display = 'block';

    let captionText = document.getElementById('locationInput');
    captionText.value = data.location;
    if (!captionText) {
    }
    // Get the <span> element that closes the modal
    let span = document.getElementById('closerNote2');
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
    };
  }

  static formStatusPreview(data) {
    console.log('calling a status edit modal');
    //   // Get the modal
    let modal = document.getElementById('myModalStatus');
    modal.style.display = 'block';
    // Get the <span> element that closes the modal
    let span = document.getElementById('closeStatus');
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
    };
  }

  static formCommentPreview(data) {
    console.log('calling a status edit modal');
    //   // Get the modal
    let modal = document.getElementById('myModalComment');
    modal.style.display = 'block';

    document.getElementById('commentEdit').value = data.comment;
    // Get the <span> element that closes the modal
    let span = document.getElementById('closeComment');
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
    };
  }

  static formEntry() {
    console.log('calling a create  modal');
    //   // Get the modal
    let modal = document.getElementById('myModalCreateRecord');
    modal.style.display = 'block';
    // Get the <span> element that closes the modal
    let span = document.getElementById('closeCreateRecord');
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
    };
  }


  static ShowProfile(promiseData){
    promiseData.then((datas) => {

      console.log(datas)

      const tablebody = document.getElementById('tablebody');

      let intervention,
      interventionDraft, 
      interventionUnderInvestigation,
       interventionResolved, 
       interventionRejected;
      

      if(datas[0].error){
        intervention= datas[0].error;
        interventionDraft = 0; 
        interventionUnderInvestigation =0;
         interventionResolved =0;
          interventionRejected =0;
      }
      else if(datas[0].data[0].interventions) {
        intervention = datas[0].data[0].interventions;
      interventionDraft = intervention.filter(i => i.status === 'draft').length;
      interventionUnderInvestigation = intervention.filter(i => i.status === 'under investigation').length;
      interventionResolved = intervention.filter(i => i.status === 'resolved').length;
      interventionRejected = intervention.filter(i => i.status === 'rejected').length;

     
      }else {
        interventionDraft = 0;
        interventionUnderInvestigation = 0;
        interventionResolved = 0;
        interventionRejected = 0;
      }

       document.getElementById('intervention-draft').innerHTML = interventionDraft;
      document.getElementById('intervention-under-investigation').innerHTML = interventionUnderInvestigation;
      document.getElementById('intervention-resolved').innerHTML = interventionResolved;
      document.getElementById('intervention-rejected').innerHTML = interventionRejected;

      
      

      let redFlag, redFlagUnderInvestigation , redFlagDraft, redFlagRejected,  redFlagResolved;
     
      if(datas[1].error){
        redFlag = datas[1].error;
         redFlagDraft = 0;
         redFlagUnderInvestigation =0;
         redFlagResolved =0;
          redFlagRejected = 0
      }
      else if(datas[1].data[0].redFlags ){
        redFlag = datas[1].data[0].redFlags;
        redFlagDraft = redFlag.filter(i => i.status === 'draft').length;
        redFlagUnderInvestigation = redFlag.filter(i => i.status === 'under investigation').length;
        redFlagResolved = redFlag.filter(i => i.status === 'resolved').length;
        redFlagRejected = redFlag.filter(i => i.status === 'rejected').length;

        
      }else {
        redFlagDraft = 0;
         redFlagUnderInvestigation =0;
         redFlagResolved =0;
          redFlagRejected = 0
      }
console.log(typeof intervention)
      document.getElementById('red-flag-draft').innerHTML = redFlagDraft;
        document.getElementById('red-flag-under-investigation').innerHTML = redFlagUnderInvestigation;
        document.getElementById('red-flag-resolved').innerHTML = redFlagResolved;
        document.getElementById('red-flag-rejected').innerHTML = redFlagRejected;
      let allRecords, eachRecord ;
      if(typeof intervention == 'object'  &&  typeof redFlag  == 'object'  ){


        allRecords = intervention.concat(redFlag);

      
      const sortedArray = allRecords.sort((a, b) => a.id - b.id);
    

      ViewBuilder.buildRecordUI(allRecords, 'profile-data') 
      }else if(typeof intervention == 'object'  &&  typeof redFlag  != 'object' ){
           
         ViewBuilder.buildRecordUI(intervention, 'profile-data') 
      }else if (typeof intervention != 'object'  &&  typeof redFlag  == 'object' ){

        
        ViewBuilder.buildRecordUI(redFlag, 'profile-data') 

      }else {
          
       let emptyData = [];

       ViewBuilder.buildRecordUI(emptyData, 'profile-data')

      }
      
      


    }).catch((error) => {
      throw error;
    });
  }
}

export default ViewBuilder;
