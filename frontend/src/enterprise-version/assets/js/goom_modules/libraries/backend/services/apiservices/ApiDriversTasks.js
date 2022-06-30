'use strict';
import GateKeepersForUser from './helpers/whois';
import getOnlineUrlConnection from './helpers/getOnlineUrlConnection';
import FetchPromiseApi from './helpers/FetchPromiseApi';
//event.preventDefault();

let activeUrl = getOnlineUrlConnection();
let baseUrl = getOnlineUrlConnection();

export default class ApiDriversTasks {
  static getAssignedCarsAndTrips() {
    let executed = false;
    GateKeepersForUser();
    const user = JSON.parse(localStorage.getItem('userToken'));

    const urls = [
      activeUrl + '/drivers-assigned-cars/' + user.user.email,
      activeUrl + '/drivers-assigned-user-trips' + user.user.email,
    ];

    const promises = urls.map(url =>
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': user.token,
        },
        mode: 'cors',
      }).then(response => response.json()),
    );

    Promise.all(promises)
      .then(datas => {
        console.log(datas);

        carsInfo = [...new Set(datas[0].data[0].carsInfo)] || []; //
        trips = [...new Set(datas[1].data[0].tripsInfo)] || [];

        console.log('hello from the app');

        // console.log(datas)
        if (document.getElementById('cars-assigned')) {
          let tablebody = document.getElementById('tablebody');

          if (carsInfo.length <= 0) {
            return (tablebody.innerHTML = `<h6 style="text-align:center">No records Yet</h6>`);
          }

          carsInfo.map((item, i) => {
            let className = 'label-success';
            if (item.status == 'Booked') {
              className = 'label-success';
            } else if (item.status == 'Available') {
              className = 'label-warning';
            } else {
              className = 'label-danger';
            }
            template2 = `<tr>
					                         <td class=""><a  href="#" id="plancat${item._id}" data-id="${
              item._id
            }" data-url="/admin-car-mgt-detail" class=""><b>${formatDate(
              new Date(item.created_at),
            )} </b></a> </td>
					                          <td class="">CMT-CAR-${item._id}</td>
					                          <td class="">${item.car_type}</td>
					                          <td class="">${item.model_make_id}</td>
					                          <td class="">${item.plate_number}</td>

					                           <td class="">${item.car_year}</td>
					                           <td class="">${item.color}</td>
					 
					                           <td class=""><span class="label ${className}">${item.status}</span></td>
					                           <td><img  style="width:100px;height:100px" src="${item.images}" /></td>
					                           <td class="">
					                               <a onclick="viewCarRecordTemplate(this)" data-model_make_id="${
                                           item.model_make_id
                                         }" data-old_car="${item.images}" href="#" data-model="${
              item.model
            }" data-car_type="${item.car_type}" data-car_id="${
              item._id
            }" data-assigned_driver_name="${
              item.assigned_driver_name
            }" data-assigned_driver_email="${item.assigned_driver_email}" data-checkmate="${
              item.assigned_driver_name
            }-${item.assigned_driver_email}" data-date="${formatDate(
              new Date(item.created_at),
            )}"  data-partner_id="${item.partner_id}" data-model="${item.model}"  data-car_year="${
              item.car_year
            }" data-color="${item.color}"  data-status="${item.status}" data-plate_number="${
              item.plate_number
            }" data-inspection_detail="${item.inspection_detail}" data-description="${
              item.description
            }"  id="plancat${item._id}" data-id="${item._id}" data-license="${
              item.license
            }" data-url="/admin-car-mgt-detail" class="table-action-btn"><i class="md md-edit"></i></a>
					                                <a onclick="deleteRecord(this)" data-id="${
                                            item._id
                                          }" data-url="/cars"  id="delete" class="table-action-btn "><i class="md md-close"></i></a></td>
					                           
					                           </td>
					                   </tr>`;
          });
        }

        if (document.getElementById('trips-assigned')) {
          alert(carsInfo);
          let tablebody2 = document.getElementById('tablebody1');
        }
      })
      .catch(error => {
        console.log(error);
        //loader.style.display = 'block';
        //mockupPreview.style.display="block"
        //gtd.style.display="none"

        throw error;
      });
    //});
  }
}
