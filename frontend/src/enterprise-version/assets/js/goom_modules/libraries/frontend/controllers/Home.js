'use strict';
import HomeModel from '../models/HomeModel';
import $ from 'jquery'
class WebsiteHome {
  constructor() {   
  }

  attachEvents() {
    if (document.getElementById('dashboard')) {
      this.indexPageController();
    }
  }

  indexPageController() {

    const links = document.getElementsByTagName('a');

     this.initToolTip()
   
   
    return HomeModel.dashboard()
  }



  initToolTip(){
   
$('.tooltipLink').hover(function () {
     var title = $(this).attr('data-tooltip');
     $(this).data('tipText', title);
     if(title == ''){}
     else{
        $('<p class="tooltip"></p>').fadeIn(200).text(title).appendTo('body');
     }
 }, function () {
     $(this).attr('data-tooltip', $(this).data('tipText'));
     $('.tooltip').fadeOut(200);
 }).mousemove(function (e) {
     var mousex = e.pageX;
     var mousey = e.pageY;
     $('.tooltip').css({
         top: mousey,
         left: mousex
     })
 });
}

}

export default WebsiteHome;
