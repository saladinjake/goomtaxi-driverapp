import $ from 'jquery';
import AuditTrail from './helpers/Logger';

import ApiBotService from '../postgres_api_bot';
import GateKeepersForAdmin from '../apiservices/helpers/whoisAdmin';
import getOnlineUrlConnection from '../apiservices/helpers/getOnlineUrlConnection';

//import carsInfo from "./helpers/cars_info";
import Validator from './helpers/validator';

import getApiUrl from '../apiservices/helpers/getOnlineUrlConnection';
let baseUrl = getApiUrl();

function guidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

window.addClickStartNew = function() {
  addMethodTrigger = true;

  if (document.getElementById('user-id')) {
    document.getElementById('user-id').innerHTML = '';

    //if(document.getElementById("user-id")){
    document.getElementById('user-id').innerHTML = '';
  }

  //}
  document.getElementById('add-new-id').addEventListener('click', e => {
    $('.mebox').hide();
    document.getElementById('create').style.visibility = 'visible';
    document.getElementById('create').style.display = 'block';
    document.getElementById('update').style.visibility = 'hidden';
    //document.getElementById("delete").style.visibility="hidden";
    document.getElementById('cancle').style.visibility = 'hidden';

    let modal_view_id = document.getElementsByClassName('mebox');
    modal_view_id[0].style.display = 'block';

    if (modal_view_id[0].querySelector('img')) {
      //car image on add should not show
      let img = modal_view_id[0].querySelector('img');
      if (img.getAttribute('title') && img.dataset.carinfo) {
        img.style.display = 'none';
        document.getElementById('oldcar').style.display = 'none';
      }
    }
    //document.getElementById("gtd").classList.add("overlay")

    var elements = document.getElementsByTagName('input');
    for (var ii = 0; ii < elements.length; ii++) {
      if (elements[ii].type == 'text') {
        elements[ii].value = '';
      }
    }

    document.getElementById('first-view').style.display = 'none';
    document.getElementById('second-view').style.display = 'block';
  });
};

window.setCarDetailsOnearning = el => {
  var selectedOption = el.options[el.selectedIndex];
  var name = selectedOption.getAttribute('data-id');

  document.getElementById(
    'vehiclePlateNo' + el.getAttribute('data-id'),
  ).value = selectedOption.getAttribute('data-vehicleplateno');
  document.getElementById(
    'vehicleName' + el.getAttribute('data-id'),
  ).value = selectedOption.getAttribute('data-vehiclename');
};

window.setCarDetail = el => {
  var selectedOption = el.options[el.selectedIndex];
  var name = selectedOption.getAttribute('data-id');

  document.getElementById(
    'car_model_id' + el.getAttribute('data-id'),
  ).value = selectedOption.getAttribute('data-id');
  document.getElementById(
    'car_model_name' + el.getAttribute('data-id'),
  ).value = selectedOption.getAttribute('data-value');
  document.getElementById(
    'car_model_trim' + el.getAttribute('data-id'),
  ).value = selectedOption.getAttribute('data-trim');
  //document.getElementById("car_year"+ idz).value =$(el).el.options[el.selectedIndex].dataset.year
};

window.setEarningsDetail = el => {
  var selectedOption = el.options[el.selectedIndex];

  document.getElementById('partnerBankAccount' + el.getAttribute('data-id')).value =
    selectedOption.getAttribute('data-bankaccount') || 'Not Given';
  document.getElementById('bankAccountName' + el.getAttribute('data-id')).value =
    selectedOption.getAttribute('data-bankaccountname') || 'Not Given';
  document.getElementById('bankAccountNumber' + el.getAttribute('data-id')).value =
    selectedOption.getAttribute('data-bankaccountnumber') || 'Not Given';
  document.getElementById('partnerId' + el.getAttribute('data-id')).value =
    selectedOption.getAttribute('data-id') || 'Not Given';
  document.getElementById('paymentReference' + el.getAttribute('data-id')).value =
    'CMT-REF-' + guidGenerator() || 'Not Given';

  if (
    typeof document.getElementById('partnerBankAccount' + el.getAttribute('data-id')).value ==
    'undefined'
  ) {
    var notification = alertify.notify(
      'Please fill in the bank account detail for this user ',
      'error',
      5,
      function() {
        console.log('dismissed');
      },
    );
    setTimeout(() => {
      window.localtion.href = '/admin-partners';
    }, 2000);
  }

  //filter cars having a given id of the partner
  let partnersCars = 0;

  // Loop through the comment list
  $('#carsme li').each(function() {
    //alert($(this).data('id')+ '==' + selectedOption.getAttribute('data-id'))

    if ($(this).data('id') == selectedOption.getAttribute('data-id')) {
      partnersCars += 1;

      // alert($(this).data('id')+ '==' + selectedOption.getAttribute('data-id'))
      $(this).show(); // MY CHANGE

      // Show the list item if the phrase matches and increase the count by 1
    } else {
      // If the list item does not contain the text phrase fade it out

      $(this).hide(); // MY CHANGE
    }
  });

  if (partnersCars == 0) {
    var notification = alertify.notify(
      'Error!!! Cant add earnings for this partner. please add a car for this partner.',
      'error',
      5,
      function() {
        console.log('dismissed');
      },
    );

    setTimeout(() => {
      window.location.href = './admin-cars-mgt';
    }, 2000);
  }

  let viewBoard = document.getElementById('viewboard');
  viewBoard.style.display = 'block';
  let h4 = viewBoard.querySelector('h4');
  h4.innerHTML = 'Select a car from  the total cars to add earnings to #' + partnersCars;
};

window.autofill = o => {
  //alert(o.options[o.selectedIndex].value)
  document.getElementById('username' + o.dataset.id).value = o.options[o.selectedIndex].value;
  document.getElementById('phone_number' + o.dataset.id).value =
    o.options[o.selectedIndex].dataset.with;

  if (!document.getElementById('ticket_id' + o.dataset.id).value) {
    document.getElementById('ticket_id' + o.dataset.id).value = 'CMT-REPORT-' + guidGenerator();
  }

  document.getElementById('comment' + o.dataset.id).disabled = false;
};

window.update_value_checked_previledges = chk_bx => {
  // chk_bx.value ="false";
  //       if(chk_bx.checked)
  //       {
  //          chk_bx.value="true";
  //       }
  //       else{
  //          chk_bx.value="false";
  //       }
  //removed this code functionality and replaced it
};

window.updateInspectionAction = o => {
  let view_id = o.dataset.id;
  let linkOfApi =
    'https://goomtaxibackendapi.herokuapp.com/api/v1' + o.dataset.url + '/' + o.dataset.id;

  const status_x = document.getElementById('health_status' + view_id);
  const confirmedInspectionDate = document.getElementById('condate' + view_id).value;

  const confirmedInspectionTime = document.getElementById('contime' + view_id).value;
  const partnerEmail_X = document.getElementById('partner_id' + view_id);

  if (!confirmedInspectionTime.length) {
    var notification = alertify.notify('Specify the time for inspection', 'error', 5, function() {
      console.log('dismissed');
    });

    return false;
  }

  if (!confirmedInspectionDate.length) {
    var notification = alertify.notify('Specify inspection date ', 'error', 5, function() {
      console.log('dismissed');
    });

    return false;
  }

  //status : Booked or Available
  //health_status: Completed or Pending

  //car_status :'Active', 'Disabled','Suspended'

  const prePostData = {
    status: 'Available',
    health_status: status_x.options[status_x.selectedIndex].text,
    confirmedInspectionDate,
    confirmedInspectionTime,
    partnerEmail: partnerEmail_X.options[partnerEmail_X.selectedIndex].text,
  };

  const user = JSON.parse(localStorage.getItem('userToken'));

  fetch(linkOfApi, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(prePostData),
    mode: 'cors',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status == 200) {
        AuditTrail.sendLogInfo(
          user,
          prePostData.partnerEmail,
          'Inspection Module',
          'Success',
          '201',
          'PUT',
          'Inspection status updated to active for the partner  ' + prePostData.partnerEmail,
        );

        var notification = alertify.notify(
          'Successfully created inspection ',
          'success',
          5,
          function() {
            console.log('dismissed');
          },
        );

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        AuditTrail.sendLogInfo(
          user,
          prePostData.partnerEmail,
          'Inspection Module',
          'Failed',
          '200',
          'PUT',
          'failed to update inspection status for partner ' + prePostData.partnerEmail,
        );

        var notification = alertify.notify(
          'Could not perform update operation.',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    })
    .catch(e => console.log(e));
};

window.viewPreviledges = el => {
  console.log(el.dataset);

  let view_id = el.dataset.id;
  console.log(view_id + 'dsjdjjs');
  let modal_view_id = document.getElementById('con-close-modala-' + view_id);
  modal_view_id.style.display = 'block';

  let showme = '#con-close-modala-' + view_id;
  let notme = '#con-close-modalla' + view_id;

  let form_previledge = document.getElementById('con-close-modalla' + view_id);
  form_previledge.style.display = 'block';

  // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

  $('.form-horizontal')
    .not(notme)
    .hide();

  document.getElementById('first-view').style.display = 'none';
  document.getElementById('second-view').style.display = 'none';
  document.getElementById('third-view').style.display = 'block';

  if (el.dataset.payments == 'yes') {
    var element = document.getElementById('payments' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.transactions == 'yes') {
    var element = document.getElementById('transactions' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.partners == 'yes') {
    var element = document.getElementById('partners' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.sos == 'yes') {
    var element = document.getElementById('sos' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.bookings == 'yes') {
    var element = document.getElementById('bookings' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.drivers == 'yes') {
    var element = document.getElementById('drivers' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.quotations == 'yes') {
    var element = document.getElementById('quotations' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.packages == 'yes') {
    var element = document.getElementById('packages' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.cars == 'yes') {
    var element = document.getElementById('cars' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.users == 'yes') {
    var element = document.getElementById('users' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.admins == 'yes') {
    var element = document.getElementById('admins' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.settings == 'yes') {
    var element = document.getElementById('settings' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.faqs == 'yes') {
    var element = document.getElementById('faqs' + el.dataset.id);
    element.checked = 1;
  }
  if (el.dataset.tickets == 'yes') {
    var element = document.getElementById('tickets' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.drivetest == 'yes') {
    var element = document.getElementById('drivetest' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.inspection == 'yes') {
    var element = document.getElementById('inspection' + el.dataset.id);
    element.checked = 1;
  }

  //managements

  if (el.dataset.mpayments == 'yes') {
    var element = document.getElementById('mpayments' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mtransactions == 'yes') {
    var element = document.getElementById('mtransactions' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mpartners == 'yes') {
    var element = document.getElementById('mpartners' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.msos == 'yes') {
    var element = document.getElementById('msos' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mbookings == 'yes') {
    var element = document.getElementById('mbookings' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mdrivers == 'yes') {
    var element = document.getElementById('mdrivers' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mquotations == 'yes') {
    var element = document.getElementById('mquotations' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mpackages == 'yes') {
    var element = document.getElementById('mpackages' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mcars == 'yes') {
    var element = document.getElementById('mcars' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.musers == 'yes') {
    var element = document.getElementById('musers' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.madmins == 'yes') {
    var element = document.getElementById('madmins' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.msettings == 'yes') {
    var element = document.getElementById('msettings' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mfaqs == 'yes') {
    var element = document.getElementById('mfaqs' + el.dataset.id);
    element.checked = 1;
  }
  if (el.dataset.mtickets == 'yes') {
    var element = document.getElementById('mtickets' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mdrivetest == 'yes') {
    var element = document.getElementById('mdrivetest' + el.dataset.id);
    element.checked = 1;
  }
  if (el.dataset.minspection == 'yes') {
    var element = document.getElementById('minspection' + el.dataset.id);
    element.checked = 1;
  }

  var save = document.getElementById('saveChanges' + el.dataset.id);

  save.addEventListener('click', function(e) {
    e.preventDefault();
    let view_bookings,
      view_quotations,
      view_payments,
      view_drivers,
      view_sos,
      view_partners,
      view_package,
      view_transactions,
      view_cars,
      view_tickets,
      view_faqs,
      view_settings,
      view_users,
      view_admins,
      view_drive_test,
      view_car_inspection,
      manage_bookings,
      manage_quotations,
      manage_payments,
      manage_drivers,
      manage_sos,
      manage_partners,
      manage_package,
      manage_transactions,
      manage_cars,
      manage_tickets,
      manage_faqs,
      manage_settings,
      manage_users,
      manage_admins,
      manage_car_inspection,
      manage_drive_test;

    let payments = document.getElementById('payments' + el.dataset.id),
      transactions = document.getElementById('transactions' + el.dataset.id),
      quotations = document.getElementById('quotations' + el.dataset.id),
      drivers = document.getElementById('drivers' + el.dataset.id),
      partners = document.getElementById('partners' + el.dataset.id),
      sos = document.getElementById('sos' + el.dataset.id),
      packages = document.getElementById('packages' + el.dataset.id),
      bookings = document.getElementById('bookings' + el.dataset.id),
      cars = document.getElementById('cars' + el.dataset.id),
      users = document.getElementById('users' + el.dataset.id),
      admins = document.getElementById('admins' + el.dataset.id),
      tickets = document.getElementById('tickets' + el.dataset.id),
      settings = document.getElementById('settings' + el.dataset.id),
      faqs = document.getElementById('faqs' + el.dataset.id),
      drivetest = document.getElementById('drivetest' + el.dataset.id),
      inspection = document.getElementById('inspection' + el.dataset.id);

    let mpayments = document.getElementById('mpayments' + el.dataset.id),
      mtransactions = document.getElementById('mtransactions' + el.dataset.id),
      mquotations = document.getElementById('mquotations' + el.dataset.id),
      mdrivers = document.getElementById('mdrivers' + el.dataset.id),
      mpartners = document.getElementById('mpartners' + el.dataset.id),
      msos = document.getElementById('msos' + el.dataset.id),
      mpackages = document.getElementById('mpackages' + el.dataset.id),
      mbookings = document.getElementById('mbookings' + el.dataset.id),
      mcars = document.getElementById('mcars' + el.dataset.id),
      musers = document.getElementById('musers' + el.dataset.id),
      madmins = document.getElementById('madmins' + el.dataset.id),
      mtickets = document.getElementById('mtickets' + el.dataset.id),
      msettings = document.getElementById('msettings' + el.dataset.id),
      mfaqs = document.getElementById('mfaqs' + el.dataset.id),
      mdrivetest = document.getElementById('mdrivetest' + el.dataset.id),
      minspection = document.getElementById('minspection' + el.dataset.id);

    if (cars.checked) {
      view_cars = 'yes';
    } else {
      view_cars = 'no';
    }

    if (bookings.checked) {
      view_bookings = 'yes';
    } else {
      view_bookings = 'no';
    }

    if (packages.checked) {
      view_package = 'yes';
    } else {
      view_package = 'no';
    }

    if (partners.checked) {
      view_partners = 'yes';
    } else {
      view_partners = 'no';
    }

    if (sos.checked) {
      view_sos = 'yes';
    } else {
      view_sos = 'no';
    }

    if (quotations.checked) {
      view_quotations = 'yes';
    } else {
      view_quotations = 'no';
    }

    if (transactions.checked) {
      view_transactions = 'yes';
    } else {
      view_transactions = 'no';
    }

    if (payments.checked) {
      view_payments = 'yes';
    } else {
      view_payments = 'no';
    }

    if (drivers.checked) {
      view_drivers = 'yes';
    } else {
      view_drivers = 'no';
    }

    if (users.checked) {
      view_users = 'yes';
    } else {
      view_users = 'no';
    }

    if (admins.checked) {
      view_admins = 'yes';
    } else {
      view_admins = 'no';
    }

    if (faqs.checked) {
      view_faqs = 'yes';
    } else {
      view_faqs = 'no';
    }

    if (tickets.checked) {
      view_tickets = 'yes';
    } else {
      view_tickets = 'no';
    }

    if (settings.checked) {
      view_settings = 'yes';
    } else {
      view_settings = 'no';
    }

    if (drivetest.checked) {
      view_drive_test = 'yes';
    } else {
      view_drive_test = 'no';
    }

    if (inspection.checked) {
      view_car_inspection = 'yes';
    } else {
      view_car_inspection = 'no';
    }

    //manager

    if (mcars.checked) {
      manage_cars = 'yes';
    } else {
      manage_cars = 'no';
    }

    if (mbookings.checked) {
      manage_bookings = 'yes';
    } else {
      manage_bookings = 'no';
    }

    if (mpackages.checked) {
      manage_package = 'yes';
    } else {
      manage_package = 'no';
    }

    if (mpartners.checked) {
      manage_partners = 'yes';
    } else {
      manage_partners = 'no';
    }

    if (msos.checked) {
      manage_sos = 'yes';
    } else {
      manage_sos = 'no';
    }

    if (mquotations.checked) {
      manage_quotations = 'yes';
    } else {
      manage_quotations = 'no';
    }

    if (mtransactions.checked) {
      manage_transactions = 'yes';
    } else {
      manage_transactions = 'no';
    }

    if (mpayments.checked) {
      manage_payments = 'yes';
    } else {
      manage_payments = 'no';
    }

    if (mdrivers.checked) {
      manage_drivers = 'yes';
    } else {
      manage_drivers = 'no';
    }

    if (musers.checked) {
      manage_users = 'yes';
    } else {
      manage_users = 'no';
    }

    if (madmins.checked) {
      manage_admins = 'yes';
    } else {
      manage_admins = 'no';
    }

    if (mfaqs.checked) {
      manage_faqs = 'yes';
    } else {
      manage_faqs = 'no';
    }

    if (mtickets.checked) {
      manage_tickets = 'yes';
    } else {
      manage_tickets = 'no';
    }

    if (msettings.checked) {
      manage_settings = 'yes';
    } else {
      manage_settings = 'no';
    }

    if (mdrivetest.checked) {
      view_drive_test = 'yes';
    } else {
      view_drive_test = 'no';
    }

    if (minspection.checked) {
      manage_car_inspection = 'yes';
    } else {
      manage_car_inspection = 'no';
    }

    const user = JSON.parse(localStorage.getItem('userToken'));
    let linkOfApi =
      'https://goomtaxibackendapi.herokuapp.com/api/v1/admin-previledges-update/' + el.dataset.id;

    let status_x = document.getElementById('status' + el.dataset.id);
    let status = status_x.options[status_x.selectedIndex].text;

    let previledges_info = el.dataset.role;

    // alert(chk_bx.value)

    let prePostData = {
      view_bookings,
      view_quotations,
      view_transactions,
      view_payments,
      view_drivers,
      view_sos,
      view_partners,
      view_package,
      view_cars,
      previledges_info,
      view_settings,
      view_faqs,
      view_admins,
      view_users,
      view_tickets,
      view_drive_test,
      view_car_inspection,
      status,

      manage_bookings,
      manage_quotations,
      manage_payments,
      manage_drivers,
      manage_sos,
      manage_partners,
      manage_package,
      manage_transactions,
      manage_cars,
      manage_tickets,
      manage_faqs,
      manage_settings,
      manage_users,
      manage_admins,
      manage_drive_test,
      manage_car_inspection,
    };

    console.log(prePostData);

    localStorage.setItem('usergroup', previledges_info);

    fetch(linkOfApi, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify(prePostData),
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          // let modal_view_id = document.getElementsByClassName("mebox");
          // modal_view_id[0].style.display="none";
          //document.getElementById("gtd").classList.remove("overlay")

          localStorage.setItem('previledges', JSON.stringify(prePostData));

          var notification = alertify.notify(
            'Successful updated of user previledges',
            'success',
            5,
            function() {
              console.log('dismissed');
            },
          );

          var notification = alertify.notify(
            'All users for this roles has been modified successfully.',
            'success',
            5,
            function() {
              console.log('dismissed');
            },
          );

          // setTimeout(()=>{
          //  window.location.reload()
          // },2000)
          AuditTrail.sendLogInfo(
            user,
            '',
            'Roles And Previledges/Edit Mode',
            'Success',
            '201',
            'PUT',
          );
        } else {
          AuditTrail.sendLogInfo(
            user,
            '',
            'Roles And Previledges/Edit Mode',
            'Failed',
            '200',
            'PUT',
          );

          var notification = alertify.notify(
            'Could not perform update operation',
            'error',
            5,
            function() {
              console.log('dismissed');
            },
          );
        }
      })
      .catch(e => console.log(e));
  });
};

window.RolesUpdate = el => {
  let view_id = el.dataset.id;
  console.log(view_id + 'dsjdjjs');
  let modal_view_id = document.getElementById('con-close-modal-' + view_id);
  modal_view_id.style.display = 'block';

  let showme = '#con-close-modal-' + view_id;

  $('.mebox')
    .not(showme)
    .hide();

  document.getElementById('first-view').style.display = 'none';
  document.getElementById('second-view').style.display = 'block';

  document.getElementById('role' + view_id).value = el.dataset.info;

  document.getElementById('description' + view_id).value = el.dataset.description;

  if (el.dataset.payments == 'yes') {
    var element = document.getElementById('payments' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.transactions == 'yes') {
    var element = document.getElementById('transactions' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.sos == 'yes') {
    var element = document.getElementById('sos' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.bookings == 'yes') {
    var element = document.getElementById('bookings' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.drivers == 'yes') {
    var element = document.getElementById('drivers' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.quotations == 'yes') {
    var element = document.getElementById('quotations' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.packages == 'yes') {
    var element = document.getElementById('packages' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.cars == 'yes') {
    var element = document.getElementById('cars' + el.dataset.id);
    element.checked = 1;
  }

  // if(el.dataset.transactions=="yes"){

  //     var element = document.getElementById("transactions"+el.dataset.id);
  //     element.checked = 1;

  // }

  if (el.dataset.users == 'yes') {
    var element = document.getElementById('users' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.admins == 'yes') {
    var element = document.getElementById('admins' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.settings == 'yes') {
    var element = document.getElementById('settings' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.faqs == 'yes') {
    var element = document.getElementById('faqs' + el.dataset.id);
    element.checked = 1;
  }
  if (el.dataset.tickets == 'yes') {
    var element = document.getElementById('tickets' + el.dataset.id);
    element.checked = 1;
  }

  //managements

  if (el.dataset.mpayments == 'yes') {
    var element = document.getElementById('mpayments' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mtransactions == 'yes') {
    var element = document.getElementById('mtransactions' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mpartners == 'yes') {
    var element = document.getElementById('mpartners' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.msos == 'yes') {
    var element = document.getElementById('msos' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mbookings == 'yes') {
    var element = document.getElementById('mbookings' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mdrivers == 'yes') {
    var element = document.getElementById('mdrivers' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mquotations == 'yes') {
    var element = document.getElementById('mquotations' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mpackages == 'yes') {
    var element = document.getElementById('mpackages' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mcars == 'yes') {
    var element = document.getElementById('mcars' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.musers == 'yes') {
    var element = document.getElementById('musers' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.madmins == 'yes') {
    var element = document.getElementById('madmins' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.msettings == 'yes') {
    var element = document.getElementById('msettings' + el.dataset.id);
    element.checked = 1;
  }

  if (el.dataset.mfaqs == 'yes') {
    var element = document.getElementById('mfaqs' + el.dataset.id);
    element.checked = 1;
  }
  if (el.dataset.mtickets == 'yes') {
    var element = document.getElementById('mtickets' + el.dataset.id);
    element.checked = 1;
  }

  // AuditTrail.sendLogInfo(user, '', 'Roles And Previledges/View Mode', 'Success', '201', 'PUT')
};

window.RolesAddAction = t => {
  let view_id = t.dataset.id;

  let linkOfApi = 'https://goomtaxibackendapi.herokuapp.com/api/v1/' + t.dataset.url;

  let usergroups_old = document.getElementById('role' + view_id).dataset.usergroups_old;
  usergroups_old = usergroups_old.split(',');

  //alert(typeof(usergroups_old))

  let previledges_info = document.getElementById('role' + view_id).value;

  let previledges_description = document.getElementById('description' + view_id).value;

  if (!previledges_description.length) {
    var notification = alertify.notify('Description required. .', 'error', 5, function() {
      console.log('dismissed');
    });
  }

  if (!previledges_info.length) {
    var notification = alertify.notify('Role title required. .', 'error', 5, function() {
      console.log('dismissed');
    });
    return false;
  }

  let prePostData = {
    previledges_info,
    previledges_description,
    usergroups_old: usergroups_old,
  };

  const user = JSON.parse(localStorage.getItem('userToken'));

  fetch(linkOfApi, {
    method: 'Post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(prePostData),
    mode: 'cors',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status === 201) {
        var notification = alertify.notify(
          'Successfully created user role.',
          'success',
          5,
          function() {
            console.log('dismissed');
          },
        );

        AuditTrail.sendLogInfo(
          user,
          prePostData.previledges_info,
          'UserGroup > Roles And Previledges/Create Mode',
          'Success',
          '201',
          'PUT',
          'Updated usergroups preveledges for ' + prePostData.previledges_info,
        );

        setTimeout(() => {
          window.location.href = './admin-previledges';
        }, 4000);
      } else {
        AuditTrail.sendLogInfo(
          user,
          '',
          'UserGroup > Roles And Previledges/Create Mode',
          'Failed',
          '200',
          'PUT',
          'failed to update previledges',
        );

        var notification = alertify.notify(
          'Could not perform update operation. Ensure the fields are filled in correctly.',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    })
    .catch(e => console.log(e));
};

window.RolesUpdateAction = t => {
  let view_id = t.dataset.id;

  let linkOfApi =
    'https://goomtaxibackendapi.herokuapp.com/api/v1/' + t.dataset.url + '/' + t.dataset.id;

  let previledges_info = document.getElementById('role' + view_id).value;

  let previledges_description = document.getElementById('description' + view_id).value;

  if (!previledges_description.length) {
    var notification = alertify.notify('Description required. .', 'error', 5, function() {
      console.log('dismissed');
    });
    return false;
  }

  if (!previledges_info.length) {
    var notification = alertify.notify('Role title required. .', 'error', 5, function() {
      console.log('dismissed');
    });
    return false;
  }

  let prePostData = {
    previledges_info,
    previledges_description,
  };

  const user = JSON.parse(localStorage.getItem('userToken'));

  fetch(linkOfApi, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(prePostData),
    mode: 'cors',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success === 'ok') {
        var notification = alertify.notify('Successfully updated roles.', 'success', 5, function() {
          console.log('dismissed');
        });

        AuditTrail.sendLogInfo(
          user,
          '',
          'UserGroup > Roles And Previledges/EDIT successful',
          'Success',
          '201',
          'PUT',
        );

        setTimeout(() => {
          window.history.back();
        }, 4000);
      } else {
        AuditTrail.sendLogInfo(
          user,
          '',
          'UserGroup > Roles And Previledges failed',
          'Failed',
          '400',
          'PUT',
        );

        var notification = alertify.notify(
          'Could not perform update operation. Ensure the fields are filled in correctly.',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    })
    .catch(e => {
      alert(e);
    });
};

window.viewInspectionUpdate = el => {
  // console.log(cars)

  let view_id = el.dataset.id;
  let modal_view_id = document.getElementById('con-close-modal-' + view_id);
  modal_view_id.style.display = 'block';

  localStorage.setItem('carId', el.dataset.id);
  //document.getElementById("gtd").classList.add("overlay")

  let showme = '#con-close-modal-' + view_id;

  // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

  $('.mebox')
    .not(showme)
    .hide();

  document.getElementById('create').style.visibility = 'hidden';
  document.getElementById('update').style.visibility = 'visible';
  document.getElementById('delete').style.visibility = 'visible';
  document.getElementById('cancle').style.visibility = 'visible';

  // document.getElementById("model"+view_id).value=el.dataset.model;

  document.getElementById('plate_number' + view_id).value = el.dataset.plate_number || '';
  document.getElementById('car_year' + view_id).value = el.dataset.car_year || '';
  // document.getElementById("car_type"+view_id).value= el.dataset.car_type;
  document.getElementById('color' + view_id).value = el.dataset.color || '';

  document.getElementById('description' + view_id).value = el.dataset.description || '';
  document.getElementById('inspection_detail' + view_id).value = el.dataset.inspection_detail || '';
  document.getElementById('partner_id' + view_id).value = el.dataset.partner_id || '';

  document.getElementById('car_model_trim' + view_id).value = el.dataset.trim || '';
  document.getElementById('car_model_name' + view_id).value = el.dataset.model || '';
  document.getElementById('car_model_id' + view_id).value = el.dataset.model_make_id || '';

  document.getElementById('inputLicense' + view_id).value = el.dataset.license || '';
  document.getElementById('inspection_date' + view_id).value = el.dataset.inspection_date || '';
  document.getElementById('inspection_time' + view_id).value = el.dataset.inspection_time || '';

  document.getElementById('condate' + view_id).value = el.dataset.condate || '';
  document.getElementById('contime' + view_id).value = el.dataset.contime || '';

  document.getElementById('car').src = el.dataset.old_car;
  let id = '#status' + el.dataset.id;
  $(id + ' option').each(function() {
    if ($(this).html() == el.dataset.status) {
      $(this).attr('selected', 'selected');
      return;
    }
  });

  let ida = '#health_status' + el.dataset.id;
  $(ida + ' option').each(function() {
    if ($(this).html() == el.dataset.health_status) {
      $(this).attr('selected', 'selected');
      return;
    }
  });

  let ida3 = '#car_status' + el.dataset.id;
  $(ida3 + ' option').each(function() {
    if ($(this).html() == el.dataset.car_status) {
      $(this).attr('selected', 'selected');
      return;
    }
  });

  let id2 = '#partner_id' + view_id;
  $(id2 + ' option').each(function() {
    // alert($(this).attr('id'))
    if ($(this).attr('id') == el.dataset.partner_id) {
      $(this).attr('selected', 'selected');
      return;
    } else {
      // $(this).html('owned by company')
    }
  });

  //  let id4= "#car_model_make"+ view_id;
  // $( id4 + " option").each(function () {
  //     if ($(this).html() == el.dataset.model_make_id) {
  //         $(this).attr("selected", "selected");
  //         return;
  //     }
  // });

  //  let id3= "#car_type"+ view_id;
  // $( id3 + " option").each(function () {
  //     if ($(this).html() == el.dataset.car_type) {
  //         $(this).attr("selected", "selected");
  //         return;
  //     }
  // });

  let idz = '#drivers' + view_id;
  $(idz + ' option').each(function() {
    let checkmate = el.dataset.checkmate;
    // console.log(checkmate)
    //alert(checkmate)
    //alert($(this).html())
    if ($(this).html() == checkmate) {
      // alert('yes check mate'+ $(this).html() )
      $(this).attr('selected', 'selected');
      return;
    }
  });

  document.getElementById('first-view').style.display = 'none';
  document.getElementById('second-view').style.display = 'block';
};

window.addInspection = () => {
  document.getElementById('add-new').addEventListener('click', e => {});
};

window.viewRetrievalUpdate = el => {
  // console.log(cars)

  let view_id = el.dataset.id;
  let modal_view_id = document.getElementById('con-close-modal-' + view_id);
  modal_view_id.style.display = 'block';

  localStorage.setItem('carId', el.dataset.id);
  //document.getElementById("gtd").classList.add("overlay")

  let showme = '#con-close-modal-' + view_id;

  // $('.mebox').not($(showme).closest('.mebox')).addClass('noOpacity');

  $('.mebox')
    .not(showme)
    .hide();
  let partnerName = '';

  // document.getElementById("model"+view_id).value=el.dataset.model;

  document.getElementById('plate_number' + view_id).value = el.dataset.plate_number || '';
  document.getElementById('car_year' + view_id).value = el.dataset.car_year || '';
  // document.getElementById("car_type"+view_id).value= el.dataset.car_type;
  document.getElementById('color' + view_id).value = el.dataset.color || '';

  document.getElementById('description' + view_id).value = el.dataset.description || '';
  document.getElementById('inspection_detail' + view_id).value = el.dataset.inspection_detail || '';
  // document.getElementById("partner_id"+view_id).value= el.dataset.partner_id || '';

  document.getElementById('car_model_trim' + view_id).value = el.dataset.trim || '';
  document.getElementById('car_model_name' + view_id).value = el.dataset.model || '';
  document.getElementById('car_model_id' + view_id).value = el.dataset.model_make_id || '';

  document.getElementById('inputLicense' + view_id).value = el.dataset.license || '';
  document.getElementById('inspection_date' + view_id).value = el.dataset.inspection_date || '';
  document.getElementById('inspection_time' + view_id).value = el.dataset.inspection_time || '';

  document.getElementById('condate' + view_id).value = el.dataset.condate;
  document.getElementById('contime' + view_id).value = el.dataset.contime;

  document.getElementById('car').src = el.dataset.old_car;
  let id = '#status' + el.dataset.id;
  $(id + ' option').each(function() {
    if ($(this).html() == el.dataset.status) {
      $(this).attr('selected', 'selected');
      return;
    }
  });

  let ida = '#health_status' + el.dataset.id;
  $(ida + ' option').each(function() {
    if ($(this).html() == el.dataset.health_status) {
      $(this).attr('selected', 'selected');
      return;
    }
  });

  let ida3 = '#car_status' + el.dataset.id;
  $(ida3 + ' option').each(function() {
    if ($(this).html() == el.dataset.car_status) {
      $(this).attr('selected', 'selected');
      return;
    }
  });

  let id2 = '#partner_id' + view_id;
  $(id2 + ' option').each(function() {
    // alert($(this).attr('id'))
    partnerName = $(this).data('username');
    // alert(partnerName)
    if ($(this).attr('id') == el.dataset.partner_id) {
      $(this).attr('selected', 'selected');
      return;
    } else {
      // $(this).html('owned by company')
    }
  });

  let idz = '#drivers' + view_id;
  $(idz + ' option').each(function() {
    let checkmate = el.dataset.checkmate;
    // console.log(checkmate)
    //alert(checkmate)
    //alert($(this).html())
    if ($(this).html() == checkmate) {
      // alert('yes check mate'+ $(this).html() )
      $(this).attr('selected', 'selected');
      return;
    }
  });

  let hasBeenRevoked = false;
  if (el.dataset.revoked == 'true') {
    hasBeenRevoked = true;
    document.getElementById('reclaim').disabled = true;
    document.getElementById('inuse').style.display = 'none';
  } else {
    hasBeenRevoked = false;
    document.getElementById('reclaim').disabled = false;
    document.getElementById('notinuse').style.display = 'none';
  }

  document.getElementById('first-view').style.display = 'none';
  document.getElementById('second-view').style.display = 'block';

  document.getElementById('reclaim').addEventListener('click', e => {
    let partna = document.getElementById('partner_id' + view_id);
    partna = partna.options[partna.selectedIndex];
    let allowed = false;
    // if(partna.text== ""){
    //    var notification = alertify.notify('Sorry Cars not added by partners cant be revoked.', 'error', 5, function(){  console.log('dismissed'); });
    //        allowed =true;
    //   return false;
    // }
    let name = partnerName || 'Goom Logistics Car';
    let emaila = partna.text;
    let pid = partna.getAttribute('id');

    let vcar = document.getElementById('car_model_make' + view_id);
    vcar = vcar.options[vcar.selectedIndex];
    let car_names = vcar.text;
    let carId = vcar.getAttribute('data-car_id');

    //if the retrival status is empty or new then enable retieve btn

    let prePostData = {
      status: 'Pending',

      date_created: new Date(),
      retrievalComments: 'Car revoked by admin due to internal resolutions.',
      vehiclePlateNo: el.dataset.plate_number,
      vehicleName: car_names,
      vehicleID: view_id,
      vehicle: view_id,
      partner: pid,
      partnerID: pid,
      partnerName: name,
      partnerEmail: emaila || 'Goom Logistics Car',
      retrievalDate: new Date(),
      hasBeenRevoked: true,
    };

    console.log(prePostData);

    //create a post for retrieval
    let linkOfApi = baseUrl + '/admin-new-car-revoke';
    let linkOfApi2 = baseUrl + '/admin-new-car-revoke-status/' + view_id;

    console.log(linkOfApi2);

    const user = JSON.parse(localStorage.getItem('userToken'));

    // if(allowed == true){

    fetch(linkOfApi, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify(prePostData),
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 201) {
          var notification = alertify.notify('Successfully revoked .', 'success', 5, function() {
            console.log('dismissed');
          });

          // AuditTrail.sendLogInfo(user, prePostData.partnerName, 'Car Revoke/Create Mode', 'Success', '201', 'PUT')

          setTimeout(() => {
            // window.location.reload()
          }, 4000);
        } else {
          // AuditTrail.sendLogInfo(user, '', 'UserGroup > Roles And Previledges/Create Mode', 'Failed', '200', 'PUT')

          var notification = alertify.notify(
            'Could not perform update operation. Ensure the fields are filled in correctly.',
            'error',
            5,
            function() {
              console.log('dismissed');
            },
          );
        }
      })
      .catch(e => console.log(e));

    let prePostData2 = {
      hasBeenRevoked: true,
      car_status: 'Disabled',
    };
    fetch(linkOfApi2, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify(prePostData2),
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          var notification = alertify.notify(
            'Car status has been updated to disabled .',
            'success',
            5,
            function() {
              console.log('dismissed');
            },
          );

          // AuditTrail.sendLogInfo(user, prePostData.partnerName, 'Car Revoke/Create Mode', 'Success', '201', 'PUT')

          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          // AuditTrail.sendLogInfo(user, '', 'UserGroup > Roles And Previledges/Create Mode', 'Failed', '200', 'PUT')

          var notification = alertify.notify(
            'Car update status operation failed.',
            'error',
            5,
            function() {
              console.log('dismissed');
            },
          );
        }
      })
      .catch(e => console.log(e));

    // }
  });

  //update revoke status

  document.getElementById('unreclaim').addEventListener('click', e => {
    let linkOfApi3 = baseUrl + '/admin-new-car-revoke-status/' + view_id;

    const user = JSON.parse(localStorage.getItem('userToken'));

    let prePostData2 = {
      hasBeenRevoked: false,
      car_status: 'Active',
    };
    fetch(linkOfApi3, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify(prePostData2),
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          var notification = alertify.notify(
            'Car status has been updated to Active .',
            'success',
            5,
            function() {
              console.log('dismissed');
            },
          );

          // AuditTrail.sendLogInfo(user, prePostData.partnerName, 'Car Revoke/Create Mode', 'Success', '201', 'PUT')

          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } else {
          // AuditTrail.sendLogInfo(user, '', 'UserGroup > Roles And Previledges/Create Mode', 'Failed', '200', 'PUT')

          var notification = alertify.notify(
            'Car update status operation failed.',
            'error',
            5,
            function() {
              console.log('dismissed');
            },
          );
        }
      })
      .catch(e => console.log(e));
  });
};

export default {
  addInspection: addInspection,
  viewInspectionUpdate: viewInspectionUpdate,
  RolesUpdateAction: RolesUpdateAction,
  RolesAddAction: RolesAddAction,
  RolesUpdate: RolesUpdate,
  viewPreviledges: viewPreviledges,

  addClickStartNew: addClickStartNew,
  setCarDetailsOnearning: setCarDetailsOnearning,
  setCarDetail: setCarDetail,
  setEarningsDetail: setEarningsDetail,
  autofill: autofill,
  update_value_checked_previledges: update_value_checked_previledges,
  updateInspectionAction: updateInspectionAction,
  viewRetrievalUpdate: viewRetrievalUpdate,
};
