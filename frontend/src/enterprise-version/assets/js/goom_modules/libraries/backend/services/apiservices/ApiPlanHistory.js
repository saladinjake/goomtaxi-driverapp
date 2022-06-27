'use strict';

import FetchPromiseApi from './helpers/FetchPromiseApi';
import Router from '../../../core/Router';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import MessageBoard from '../../../core/MessageBoard';

let activeUrl = getOnlineUrlConnection();

let baseUrl = getOnlineUrlConnection();



window.getPlanId = (item) =>{
  localStorage.setItem("setPlan",item.dataset.plan_id);

  window.location.href = "./plan-detail"
}



var sortBy = (function () {
  var toString = Object.prototype.toString,
      // default parser function
      parse = function (x) { return x; },
      // gets the item to be sorted
      getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };

  /**
   * Sorts an array of elements.
   *
   * @param  {Array} array: the collection to sort
   * @param  {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby (array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== "[object Object]") cfg = {};
    if (typeof cfg.parser !== "function") cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };

}());



function searchTable(tbId="#foo-table-input") {


  // $(document).ready(function(){

  // Search all columns
  $(tbId).keyup(function(){
    // Search Text
    var search = $(this).val();

    // Hide all table tbody rows
    $('table tbody tr').hide();

    // Count total search result
    var len = $('table tbody tr:not(.notfound) td:contains("'+search+'")').length;

    if(len > 0){
      // Searching text in columns and show match row
      $('table tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
        $(this).closest('tr').show();
      });
    }else{
      //$('.notfound').show();
    }

  });

  
// // });

// // Case-insensitive searching (Note - remove the below script for Case sensitive search )
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
   return function( elem ) {
     return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
   };
});
}
function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " //+ strTime;
}


window.getPlanId = (item) =>{
  localStorage.setItem("setPlan",item.dataset.plan_id);
  
  window.location.href ="./plan-detail"
}


let planClicked;

function ApiPlanHistory() {
  GateKeepersForUser();
  if(document.getElementById("plan-history")){

    if(localStorage.getItem('userToken')){
    const user = JSON.parse(localStorage.getItem('userToken'));
    //window.addEventListener('DOMContentLoaded', event => {
      //event.preventDefault();
      const urls = [
                    activeUrl + `/plans/${user.user.email}/user`
      ];


      

      const promises = urls.map(url =>
        fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': user.token,
          },
           mode: 'cors',
        }).then(response => response.json()),
      );
      

      Promise.all(promises)
        .then(datas => {
             
              const tablebody2 = document.getElementById('tablebodyB');

               
                   
                    let plans = datas[0].data[0].plans;

                    plans = sortBy(plans, {
                      prop: "created_at",
                      desc: true,
                      parser: (d) => new Date(d)
                    })
                    
                    let template2;
                    let planAction ='';
                    let classFor=``;
                    plans.map((item, i) => {
                       let old_id = item._id;
                       item._id = item._id.substring(0,7);
                        if(item.has_updated=="Yes"){ //if quotation has been sent
                             //item.price= `Quote not yet sent.`;
                             //item.payment_status=`<span class="label label-table label-danger">${item.payment_status}</span>`;
                             

                            if(item.status=="Paid"){
                                classFor =`label-success`;
                                item.price= `₦ ${item.price}`;
                                planAction = ` <td class="">
                                                       <a onclick="getPlanId(this)" id="plan-current-${item.plan_id}" href="#" data-plan_id="${item.plan_id}" data-id="${item.plan_id}" href="#" class="table-action-btn  btn-purple"><i class="glyphicon glyphicon-ok"></i></a>
                                                  </td>`
                            }else{
                               classFor =`label-danger`;
                             planAction = ` <td class="">
                                                   <a onclick="getPlanId(this)" id="plan-current-${item.plan_id}" href="#" data-plan_id="${item.plan_id}" data-id="${item.plan_id}" class="table-action-btn btn-custom btn-purple"><i class="md md-chevron-right"></i></a>
                                              </td>`
                            }
                          }else if(item.has_updated=="No"){
                            classFor="label-warning"
                            item.price= `Quote not yet sent.`;
                             //item.payment_status=`<span class="label label-table label-danger">${item.payment_status}</span>`;
                             planAction = ` <td class="">
                                                   <a id="plan-current-${item.plan_id}" onclick="getPlanId(this)" data-plan_id="${item.plan_id}" data-id="${item.plan_id}" href="#" class="table-action-btn btn-custom btn-purple"><i class="md md-chevron-right"></i></a>
                                              </td>`
                          }
                      template2 =`<tr>
                                    <td class=""><a href="#">${item.plan_id}</a></td>
                                        <td class="">${item.plan_category_name}   </td>
                                      
                                        <td class="">${formatDate(new Date(item.created_at))+ " " }</td>
                                         <td class="">${item.itineries.length}</td>
                                         <td class=""><span class="label label-warning">Charges:</span> ${item.price}</td>
                                          <td class="">  ${planAction}</td>
                          </tr>`;
                          tablebody2.insertAdjacentHTML('beforeend', template2);
                  });

              document.getElementById("foo-table-input2").addEventListener("keyup",(e)=>{
                 searchTable("#foo-table-input2");
               })
                   

            //}
            

        })
        .catch(error => {
          throw error;
        });
    //});

  }

  }
}

export default ApiPlanHistory;
  