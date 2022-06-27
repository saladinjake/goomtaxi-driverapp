import DriversAssignementModel from '../models/DriversAssignmentModel';
import $ from 'jquery';


import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection'
let baseUrl =  getApiUrl();

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:12000";

window.viewRecordDriverUserItinsDetail =(el) =>{
    
    document.getElementById('first-view').style.display="none"

	let view_id = el.dataset.id;
	//alert('clicked' + el.dataset.id)
	//console.log(view_id+ "dsjdjjs")
	let modal_view_id = document.getElementById("con-close-modal-"+ view_id);
	modal_view_id.style.display="block";



	let showme ="#con-close-modal-"+ view_id

	 // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

	 $('.mebox').not(showme).hide();


	 document.getElementById('second-view').style.display="block"


}


function searchTable(trId=0) {


  // $(document).ready(function(){

  // Search all columns
  $('#search').keyup(function(){
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



function goBackFor(){

  	let documentDom = document;
  	 $('.mebox').hide();
    documentDom.addEventListener(
      'click',
      e => {
        if (e.target.classList.contains("gobackFor")) {
         // window.history.back()
         setTimeout(()=>{
         	   window.location.reload()
         },1000)
       

    	  //hide all other modal
        }
      },
      false,
    );

  }


function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}
export default class DriversAssignement{

	constructor(){}

	attachEvents(){
		this.indexController()


		if(localStorage.getItem('userToken')){
			let user = JSON.parse(localStorage.getItem('userToken'))

			if(user.user.roles!='user'){
				document.getElementById('balance').style.display="none"
			}

		     
		}

		if(document.getElementById('driver-ratings')){
           let clicked =document.querySelectorAll('input')
           for(var i=0; i<clicked.length;i++){
           	 clicked[i].addEventListener('change',(e)=>{
           	 	driverRatings(e);
           	 })

           }
		}

		
	}


	driverRatings(event){
	    var checkValue = document.querySelectorAll("input");
	    var checkStar = document.querySelectorAll("label");
	    var checkSmiley = document.querySelectorAll("i");
	    var checkCount = 0;
	    for(var i=0; i<checkValue.length; i++){
	        if(checkValue[i]==event.target){
	            checkCount = i+1;
	        }
	    }
	    for(var j=0; j<checkCount; j++){
	        checkValue[j].checked = true;
	        checkStar[j].className = "rated";
	        checkSmiley[j].style.display = "none";
	    }
	    
	    for(var k=checkCount; k<checkValue.length; k++){
	        checkValue[k].checked = false;
	        checkStar[k].className = "check"
	        checkSmiley[k].style.display = "none";	
	    }
	    if(checkCount == 1){
	        document.querySelectorAll("i")[0].style.display = "block";
	    }
	    if(checkCount == 2){
	        document.querySelectorAll("i")[1].style.display = "block";
	    }
	    if(checkCount == 3){
	        document.querySelectorAll("i")[2].style.display = "block";
	    }
	    if(checkCount == 4){
	        document.querySelectorAll("i")[3].style.display = "block";
	    }
	    if(checkCount == 5){
	        document.querySelectorAll("i")[4].style.display = "block";
	    }
  }


	indexController(){
        goBackFor()
		let executed = false;
		let viewModals ='';



		if(JSON.parse(localStorage.getItem('userToken'))){


						const user = JSON.parse(localStorage.getItem('userToken'));

			      const urls = [ baseUrl + '/drivers-assigned-cars/'+ user.user.email, 
			                     baseUrl + '/drivers-assigned-user-trips/'+ user.user.email
			      ];
			     
			    const tablebody2 = document.getElementById('tablebody1');
			     

			      

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
					        	console.log(datas)


					        	let carsInfo =[...new Set(datas[0].data[0].carsInfo)] || []; //
	                           let  trips = [...new Set(datas[1].data[0].tripsInfo)] || [];
	            


					        	 // console.log(datas)
	           if(carsInfo.length<=0){
	           	       	if(document.getElementById("cars-assigned")){
                         return tablebody2.innerHTML = `<h6 style="text-align:center">No records Yet</h6>`;
                        }
                   }

					  	carsInfo.map((item, i) => { 
					  		let className = "label-success"
					  	    if(item.status=="Booked"){
					           className = "label-success"
					  	    }else if(item.status=="Available"){
					           className = "label-warning"
					  	    } else{
					           className = "label-danger"
					        }          
					        let template2 =`<tr>
					                         <td class=""><a  href="#" id="plancat${item._id}" data-id="${item._id}" data-url="/admin-car-mgt-detail" class=""><b>${formatDate(new Date(item.created_at))} </b></a> </td>
					                          <td class="">CMT-CAR-${item._id}</td>
					                          <td class="">${item.car_type}</td>
					                          <td class="">${item.model_make_id}</td>
					                          <td class="">${item.plate_number}</td>

					                           <td class="">${item.car_year}</td>
					                           <td class="">${item.color}</td>
					 
					                           <td class=""><span class="label ${className}">${item.status}</span></td>
					                           <td><img  style="width:100px;height:100px" src="${item.images}" /></td>
					                           
					                   </tr>`;

					                   	if(document.getElementById("cars-assigned")){

		 //  document.getElementById("search").addEventListener("keyup",(e)=>{
   // 	 searchTable() 
   // })
	            	
	            	                               tablebody2.insertAdjacentHTML('beforeend', template2);

	                                    }
	            

					                  

						  })  



	            

	                 
	              
	            

	            if(document.getElementById("trips-assigned")){
	            	
		 //  document.getElementById("search").addEventListener("keyup",(e)=>{
   // 	 searchTable() 
   // })


	            	if(trips.length<=0){
                         return tablebody2.innerHTML = `<h6 style="text-align:center">No records Yet</h6>`;
                    }



	            	
	            	let tablebody2 = document.getElementById('tablebody1');

	            	let modalbody1 = document.getElementById('modalbody1');





					  	trips.map((item, i) => { 
					  		
					  		let className = "label-success"
					  	    if(item.status=="Completed"){
					           className = "label-success"
					  	    }else if(item.status=="Ongoing"){
					           className = "label-danger"
					  	    } else{
					           className = "label-warning"
					        }          
					        let template2 =`<tr id="${i}">
                                <td>${formatDate(new Date(item.created_at))} </td>
                          <td class="">${item.username}</td>
                          <td class="">${item.email}</td>
                          <td class="">${item.start_location} </td>
                          <td class="">${item.destination}</td>
                            
                            
                            <td class=""><span class="label label-table ${className}">${item.status}</span></td>
                            <td class=""></td>

                            <td class="">
                               <a onclick="viewRecordDriverUserItinsDetail(this)" href="#" data-checkmate="${item.assigned_driver_name}-${item.assigned_driver_email}"  data-id="${item._id}" data-start_time="${formatDate(new Date(item.start_time))}" data-end_time="${formatDate(new Date(item.end_time))}" data-id="${item._id}" data-no_hours="${item.no_hours}" data-start_location="${item.start_location}" data-destination="${item.destination}" data-drive_option="${item.drive_option}"  data-travel_option="${item.travel_option}"  data-username="${item.username}"  data-email="${item.email}"  data-phone_number="${item.phone_number}"  id="plancat${item._id}" data-assigned_driver_name="${item.assigned_driver_name}" data-status="${item.status}" data-id="${item._id}" data-url="/admin-itinerary-details" class="table-action-btn btn-custom btn-purple"><i class="md md-chevron-right"></i></a>
                                
                           </td>
                                                                               
                         </tr>`; 
                        

					                   	if(document.getElementById("trips-assigned")){
	            	
	            	                               tablebody2.insertAdjacentHTML('beforeend', template2);

	                                    }



	                viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar"> 
                                            <div > 
                                                <div class=""> 
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> 
                                                   
                                                </div> 
                                                <div class=""> 
                                                    <div class="row"> 
                                                         <div class="form-group">
									                        <label for="position">Status</label>
									                        <select disabled id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>${item.status}</option>
									                            
									                             
									                        </select>
									                        </div>

                                          <div class="form-group">
                                                                  <label for="position">Assigned Drivers</label>
                                                                  <select disabled id="assigned_driver${item._id}" class="form-control" data-style="btn-white">
                                                                      
                                                                      <option>${item.assigned_driver_email}</option>
                                                                       
                                                                  </select>
                                                                  </div>


                                                         <div class=""> 
                                                            <div class="form-group"> 
                                                                <label for="field-5" class="control-label">Start Time</label> 
                                                                <input  type="text" disabled class="form-control" id="start_time${item._id}" placeholder="unlimited" value="${formatDate(new Date(item.start_time))}"> 
                                                            </div> 
                                                        </div>
                                                        


									                        <div class=""> 
                                                            <div class="form-group"> 
                                                                <label for="field-4" class="control-label">Drive Option</label> 
                                                                <input type="text" disabled class="form-control" id="drive_option${item._id}" value="${item.drive_option}" placeholder="AE-GX-2211"> 
                                                            </div> 
                                                        </div>
                                                    </div> 

                                                    <div class="row"> 

                                                        

                                                       <div > 
                                                            <div class="form-group"> 
                                                                <label for="field-5" class="control-label">Travel Option</label> 
                                                                <input  type="text" disabled class="form-control" value="${item.travel_option}" id="travel_option${item._id}" placeholder="unlimited"> 
                                                            </div> 
                                                        </div>


                                                        <div class=""> 
                                                            <div class="form-group"> 
                                                                <label for="field-5" class="control-label">No of hours</label> 
                                                                <input value="${item.no_hours}"  type="text" disabled class="form-control" id="no_hours${item._id}" placeholder="unlimited"> 
                                                            </div> 
                                                        </div>


                                                                
                                                        
                                                       


                                                        

                                                     
                                                        <div class="" style="display:none"> 
                                                            <div class="form-group">  
                                                                <label for="field-4" class="control-label">End Time</label> 
                                                                <input type="text" value="${formatDate(new Date(item.end_time))}" disabled class="form-control" id="end_time${item._id}" placeholder="saladin"> 
                                                            </div> 
                                                            </div>
                                                         
									                    
                                                        


                                                        

                                                    </div> 
                                                    <div class="row"> 
                                                        <div class="col-md-12"> 


                                                            <div class=""> 
	                                                            <div class="form-group">  
	                                                                <label for="field-4" class="control-label">Username</label> 
	                                                                <input value="${item.username}" type="text" disabled class="form-control" id="username${item._id}" placeholder="saladin"> 
	                                                            </div> 
                                                            </div>

									                        <div class=""> 
	                                                            <div class="form-group"> 
	                                                                <label for="field-4" class="control-label">Email</label> 
	                                                                <inputemail value="${item.email}" type="text" disabled class="form-control" id="email${item._id}" placeholder=""> 
	                                                            </div> 
                                                            </div>

                                                            <div class=""> 
	                                                            <div class="form-group"> 
	                                                                <label for="field-4" class="control-label">Phone</label> 
	                                                                <input value="${item.phone_number}"  type="text" disabled class="form-control" id="phone_number${item._id}" placeholder="AE-GX-2211"> 
	                                                            </div> 
                                                            </div>

                                                            

                                                            <br/>
                                                            
                                                            <div class="form-group"> 
                                                                <label for="field-3" class="control-label">Start Location</label> 
                                                                

                                                            <textarea disabled class="form-control autogrow" id="start_location${item._id}" placeholder="Description" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;">${item.start_location}</textarea>

                                                            </div> 



                                                            <div class="form-group"> 
                                                                <label for="field-3" class="control-label">Destination</label> 
                                                                

                                                            <textarea disabled class="form-control autogrow" id="destination${item._id}" placeholder="Response" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;">${item.destination}</textarea>

                                                            </div> 
                                                          
                                                          
                                                           
                                                            

                                                        </div> 
                                                    </div> 
                                                    
                                                    <div class="row"> 
                                                        

                                                    </div> 
                                                </div> 
                                                <div class="modal-footer">
                                                  <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button> 
                                                   
                                                </div> 
                                            </div> 
                                        </div>
                                    </div>



        

		      `;

	            
                       
					                  

						  }) 

						  modalbody1.innerHTML=viewModals 



	            }


	            if(document.getElementById('completed-trips')){


	            	let tablebodyc = document.getElementById('tablebodyc');





					  	trips.map((item, i) => { 
					  		let className = "label-success"
					  	    if(item.status=="Completed"){
					           className = "label-success"
					  	    
					                 
					        let template2 =`<tr id="${i}">
                                <td>${formatDate(new Date(item.created_at))} </td>
                          <td class="">${item.username}</td>
                          <td class="">${item.email}</td>
                          <td class="">${item.start_location} </td>
                          <td class="">${item.destination}</td>
                         
                            
                            <td class=""><span class="label label-table ${className}">${item.status}</span></td>
                             <td class=""></td>

                            <td class="">
                               <a  href="#" data-checkmate="${item.assigned_driver_name}-${item.assigned_driver_email}"  data-id="${item._id}" data-start_time="${formatDate(new Date(item.start_time))}" data-end_time="${formatDate(new Date(item.end_time))}" data-id="${item._id}" data-no_hours="${item.no_hours}" data-start_location="${item.start_location}" data-destination="${item.destination}" data-drive_option="${item.drive_option}"  data-travel_option="${item.travel_option}"  data-username="${item.username}"  data-email="${item.email}"  data-phone_number="${item.phone_number}"  id="plancat${item._id}" data-assigned_driver_name="${item.assigned_driver_name}" data-status="${item.status}" data-id="${item._id}" data-url="/admin-itinerary-details" class="table-action-btn btn-custom btn-purple"><i class="md md-chevron-right"></i></a>
                                
                           </td>
                                                                               
                         </tr>`; 

                           tablebodyc.insertAdjacentHTML('beforeend', template2);


                          }
                        

					    
	            	 viewModals+=  `<div style="display:none" id="con-close-modal-${item._id}" class="fade in mebox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                                        <div class="slimScrollBar"> 
                                            <div > 
                                                <div class=""> 
                                                    <button id="close-id" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> 
                                                   
                                                </div> 
                                                <div class=""> 
                                                    <div class="row"> 
                                                         <div class="form-group">
									                        <label for="position">Status</label>
									                        <select disabled id="status${item._id}" class="form-control" data-style="btn-white">
									                            <option>${item.status}</option>
									                            
									                             
									                        </select>
									                        </div>

                                          <div class="form-group">
                                                                  <label for="position">Assigned Drivers</label>
                                                                  <select disabled id="assigned_driver${item._id}" class="form-control" data-style="btn-white">
                                                                      
                                                                      <option>${item.assigned_driver_email}</option>
                                                                       
                                                                  </select>
                                                                  </div>


                                                         <div class=""> 
                                                            <div class="form-group"> 
                                                                <label for="field-5" class="control-label">Start Time</label> 
                                                                <input  type="text" disabled class="form-control" id="start_time${item._id}" placeholder="unlimited" value="${formatDate(new Date(item.start_time))}"> 
                                                            </div> 
                                                        </div>
                                                        


									                        <div class=""> 
                                                            <div class="form-group"> 
                                                                <label for="field-4" class="control-label">Drive Option</label> 
                                                                <input type="text" disabled class="form-control" id="drive_option${item._id}" value="${item.drive_option}" placeholder="AE-GX-2211"> 
                                                            </div> 
                                                        </div>
                                                    </div> 

                                                    <div class="row"> 

                                                        

                                                       <div > 
                                                            <div class="form-group"> 
                                                                <label for="field-5" class="control-label">Travel Option</label> 
                                                                <input  type="text" disabled class="form-control" value="${item.travel_option}" id="travel_option${item._id}" placeholder="unlimited"> 
                                                            </div> 
                                                        </div>


                                                        <div class=""> 
                                                            <div class="form-group"> 
                                                                <label for="field-5" class="control-label">No of hours</label> 
                                                                <input value="${item.no_hours}"  type="text" disabled class="form-control" id="no_hours${item._id}" placeholder="unlimited"> 
                                                            </div> 
                                                        </div>


                                                                
                                                        
                                                       


                                                        

                                                     
                                                        <div class="" style="display:none"> 
                                                            <div class="form-group">  
                                                                <label for="field-4" class="control-label">End Time</label> 
                                                                <input type="text" value="${formatDate(new Date(item.end_time))}" disabled class="form-control" id="end_time${item._id}" placeholder="saladin"> 
                                                            </div> 
                                                            </div>
                                                         
									                    
                                                        


                                                        

                                                    </div> 
                                                    <div class="row"> 
                                                        <div class="col-md-12"> 


                                                            <div class=""> 
	                                                            <div class="form-group">  
	                                                                <label for="field-4" class="control-label">Username</label> 
	                                                                <input value="${item.username}" type="text" disabled class="form-control" id="username${item._id}" placeholder="saladin"> 
	                                                            </div> 
                                                            </div>

									                        <div class=""> 
	                                                            <div class="form-group"> 
	                                                                <label for="field-4" class="control-label">Email</label> 
	                                                                <inputemail value="${item.email}" type="text" disabled class="form-control" id="email${item._id}" placeholder=""> 
	                                                            </div> 
                                                            </div>

                                                            <div class=""> 
	                                                            <div class="form-group"> 
	                                                                <label for="field-4" class="control-label">Phone</label> 
	                                                                <input value="${item.phone_number}"  type="text" disabled class="form-control" id="phone_number${item._id}" placeholder="AE-GX-2211"> 
	                                                            </div> 
                                                            </div>

                                                            

                                                            <br/>
                                                            
                                                            <div class="form-group"> 
                                                                <label for="field-3" class="control-label">Start Location</label> 
                                                                

                                                            <textarea disabled class="form-control autogrow" id="start_location${item._id}" placeholder="Description" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;">${item.start_location}</textarea>

                                                            </div> 



                                                            <div class="form-group"> 
                                                                <label for="field-3" class="control-label">Destination</label> 
                                                                

                                                            <textarea disabled class="form-control autogrow" id="destination${item._id}" placeholder="Response" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;">${item.destination}</textarea>

                                                            </div> 
                                                          
                                                          
                                                           
                                                            

                                                        </div> 
                                                    </div> 
                                                    
                                                    <div class="row"> 
                                                        

                                                    </div> 
                                                </div> 
                                                <div class="modal-footer">
                                                  <button id="cancle" data-id="${item._id}" onclick="addCloseEffect(this)" type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button> 
                                                   
                                                </div> 
                                            </div> 
                                        </div>
                                    </div>



        

		      `;

	            
                       
					                  

						  }) 

						  modalbody1.innerHTML=viewModals  

	            }

					            
				           

				}).catch(error => {
				        	console.log(error)
				           
				          throw error;
			});
				  
       
      

		}else{
			
		}
	  
	  
	}
}