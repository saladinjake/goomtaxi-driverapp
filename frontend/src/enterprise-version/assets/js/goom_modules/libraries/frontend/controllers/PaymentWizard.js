import $ from 'jquery';
import getApiUrl from '../../backend/services/apiservices/helpers/getOnlineUrlConnection';
let baseUrl = getApiUrl();

function setOldBalance(balance, currentBalance) {
  const user = JSON.parse(localStorage.getItem('userToken'));
  return fetch(baseUrl + '/old_balance/' + user.user.email, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    mode: 'cors',
    body: JSON.stringify({ old_balance: balance, balance: currentBalance }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        var notification = alertify.notify('Wallet balance set.', 'success', 5, function() {
          console.log('dismissed');
        });
      }
    })
    .catch(error => {
      throw error;
    });
}

export default class PaymentWizard {
  constructor() {}

  static payWithPaystack() {
    //if(!){}
    let user = JSON.parse(localStorage.getItem('userToken'));

    let userPaymentDetails = JSON.parse(localStorage.getItem('quoteToPay'));
    let oldBalance = user.user.balance;
    let newBalance = userPaymentDetails.amount;
    oldBalance = parseFloat(oldBalance);

    console.log(userPaymentDetails);
    userPaymentDetails.reference = 'CMT-PAYSTACK-' + userPaymentDetails.reference;

    var handler = PaystackPop.setup({
      key: 'pk_test_3eaf2b6c567a58ecdac18b0e0cb9e68dc83d9226',
      email: user.user.email,
      amount: userPaymentDetails.amount * 100,
      ref: 'CMT-PAYSTACK-' + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: user.user.firstname,
            variable_name: user.user.firstname,
            value: user.user.phoneNumber,
          },
        ],
      },
      callback: function(response) {
        let userPaymentDetails = JSON.parse(localStorage.getItem('quoteToPay'));

        const user = JSON.parse(localStorage.getItem('userToken'));

        let linkOfApi = baseUrl + `/debit-wallet-transactions/` + user.user.email + '/user';
        let record = {
          oldBalance: parseFloat(getBalance()),
          debit_amount: parseFloat(JSON.parse(localStorage.getItem('quoteToPay')).amount),
        };

        let currentBalance = oldBalance - parseFloat(newbalance);

        var notification = alertify.notify(
          'Please wait while transaction is processing...',
          'success',
          25,
          function() {
            console.log('dismissed');
          },
        );

        setOldBalance(getBalance(), currentBalance);

        setTimeout(() => {
          updateAccountBalance(linkOfApi, record); //
          updateStatus(baseUrl + '/' + `plan-status/` + userPaymentDetails.plan_id + '/update', {
            status: 'Paid',
            amount: userPaymentDetails.amount,
            has_updated: 'Yes',
          }); //itinerary status
          updateStatus(baseUrl + '/' + `itin-status/` + userPaymentDetails.plan_id + '/update', {
            status: 'Ongoing',
          }); //plan status
          updateStatus(baseUrl + '/' + `quote-status/` + userPaymentDetails.plan_id + '/update', {
            status: 'Paid',
            amount: userPaymentDetails.amount,
          }); //quotation
          getBalance();

          createPlaymentDetail(baseUrl + '/' + 'makepayments', {
            status: 'Paid',
            reference: userPaymentDetails.reference,
            plan_id: userPaymentDetails.plan_id,
            quotation_id: userPaymentDetails.quotation_id,
            amount: userPaymentDetails.amount * 100,
            username: userPaymentDetails.username,
            email: userPaymentDetails.email,
            phone_number: userPaymentDetails.phone_number,
          });
        }, 7000);

        let itins_url = baseUrl + '/user-itinerary-status-update/' + planId;
        let prepostItins = {
          status: 'Paid',
        };

        setTimeout(() => {
          window.location.href = './plan-history';
        }, 10000);
      },
      onClose: function() {
        var notification = alertify.notify(
          'Successfully closed this operation.',
          'success',
          5,
          function() {
            console.log('dismissed');
          },
        );
      },
    });
    handler.openIframe();
  }

  static onchangeTrigger() {
    document.getElementById('next-link').disabled = true;
    $('select').on('change', function() {
      if (this.value === 'Paystack') {
        //redirect to paystack PAYMENT
        PaymentWizard.payWithPaystack();
      } else {
        let user = JSON.parse(localStorage.getItem('userToken'));
        if (document.getElementById('amount2')) {
          let paymentDetail = JSON.parse(localStorage.getItem('quoteToPay'));

          let oldb = parseFloat(user.user.balance);

          if (oldb <= 0) {
            var notification = alertify.notify(
              'Insufficient balance to perform transaction. You need to top up',
              'error',
              10,
              function() {
                console.log('dismissed');
              },
            );

            return (window.location.href = './wallet');
          } else if (parseFloat(oldb) < parseFloat(paymentDetail.amount)) {
            var notification = alertify.notify(
              'Insufficient balance to perform transaction. You need to top up',
              'error',
              10,
              function() {
                console.log('dismissed');
              },
            );

            return (window.location.href = './wallet');
          }
          // pay from wallet account
          PaymentWizard.driftToEWalletPayment();
        }
      }
    });
  }

  static driftToEWalletPayment() {
    document.getElementById('next-link').disabled = false;
  }

  attachEvents() {
    let user = JSON.parse(localStorage.getItem('userToken'));

    if (document.getElementById('amount2')) {
      let paymentDetail = JSON.parse(localStorage.getItem('quoteToPay'));
      document.getElementById('amount').innerHTML = paymentDetail.amount;
      document.getElementById('amount2').innerHTML = paymentDetail.amount;
      document.getElementById('reference').innerHTML = paymentDetail.reference;
      document.getElementById('reference2').innerHTML = paymentDetail.reference;
      document.getElementById('phone').value = paymentDetail.phone;
      document.getElementById('email').value = paymentDetail.email;
      document.getElementById('users-balance').value = paymentDetail.balance;
      document.getElementById('username').value = paymentDetail.firstname;
      document.getElementById('plan_id').value = paymentDetail.plan_id;
      document.getElementById('quotation_id').value = paymentDetail.quotation_id;
      document.getElementById('mainBalance').innerHTML = paymentDetail.balance;
      document.getElementById('deduction').innerHTML = paymentDetail.amount;
      let newbalance = user.user.balance - paymentDetail.amount;
      document.getElementById('newbalance').innerHTML = newbalance;

      let currentBalance = newbalance;

      PaymentWizard.onchangeTrigger();
      PaymentWizard.initWizard();
      var notification = alertify.notify(
        'Updating account balance please wait...',
        'success',
        12,
        function() {
          console.log('dismissed');
        },
      );

      PaymentWizard.deductionOperation(
        parseFloat(getBalance()),
        parseFloat(JSON.parse(localStorage.getItem('quoteToPay')).amount),
      );

      //  setTimeout(()=>{
      //    setOldBalance(getBalance(),currentBalance)
      // },3000)
    }
  }

  static initWizard() {
    $(document).ready(function() {
      var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

      allWells.hide();

      navListItems.click(function(e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
          $item = $(this);

        if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-primary').addClass('btn-default');
          $item.addClass('btn-primary');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
        }
      });

      allNextBtn.click(function() {
        var curStep = $(this).closest('.setup-content'),
          curStepBtn = curStep.attr('id'),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]')
            .parent()
            .next()
            .children('a'),
          curInputs = curStep.find(
            "input[type='text'],input[type='email'],input[type='number'],select",
          ),
          isValid = true;

        $('.form-group').removeClass('has-error');
        for (var i = 0; i < curInputs.length; i++) {
          if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i])
              .closest('.form-group')
              .addClass('has-error');
          }
        }

        if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
      });

      allPrevBtn.click(function() {
        var curStep = $(this).closest('.setup-content'),
          curStepBtn = curStep.attr('id'),
          prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]')
            .parent()
            .prev()
            .children('a');

        $('.form-group').removeClass('has-error');
        prevStepWizard.removeAttr('disabled').trigger('click');
      });

      $('div.setup-panel div a.btn-primary').trigger('click');
    });
  }

  static deductionOperation(oldBalance, newBalance) {
    document.getElementById('deduction-action').addEventListener('click', e => {
      e.preventDefault();
      console.log('deduction of wallet balance....');

      let userPaymentDetails = JSON.parse(localStorage.getItem('quoteToPay'));
      const user = JSON.parse(localStorage.getItem('userToken'));

      let linkOfApi = baseUrl + `/debit-wallet-transactions/` + user.user.email + '/user';
      let record = {
        oldBalance,
        debit_amount: newBalance,
      };

      // if(record.oldBalance<=0){

      //    var notification = alertify.notify('Insufficient balance to perform transaction. You need to top up', 'error', 10, function(){  console.log('dismissed'); });

      //    return false

      //  }else if(parseFloat(userPaymentDetails.amount)> oldBalance){
      //    //false
      //    var notification = alertify.notify('Insufficient balance to perform transaction. please top up your wallet', 'error', 10, function(){  console.log('dismissed'); });

      //    return false
      //  }

      userPaymentDetails.reference = 'CMT-WALLET-' + userPaymentDetails.reference;

      var notification = alertify.notify(
        'Please wait while transaction is processing...',
        'success',
        15,
        function() {
          console.log('dismissed');
        },
      );

      setTimeout(() => {
        updateAccountBalance(linkOfApi, record); //
        updateStatus(baseUrl + '/' + `plan-status/` + userPaymentDetails.plan_id + '/update', {
          status: 'Paid',
          amount: userPaymentDetails.amount,
          has_updated: 'Yes',
        }); //itinerary status
        updateStatus(baseUrl + '/' + `itin-status/` + userPaymentDetails.plan_id + '/update', {
          status: 'Paid',
          has_received_payments: 'Yes',
          has_received_quote: 'Yes',
          user_plan_id: userPaymentDetails.plan_id,
        }); //plan status
        updateStatus(baseUrl + '/' + `quote-status/` + userPaymentDetails.plan_id + '/update', {
          status: 'Paid',
          amount: userPaymentDetails.amount,
          has_updated: 'Yes',
        }); //quotation
        getBalance();

        createPlaymentDetail(baseUrl + '/' + 'makepayments', {
          status: 'Paid',
          reference: userPaymentDetails.reference,
          plan_id: userPaymentDetails.plan_id,
          quotation_id: userPaymentDetails.quotation_id,
          amount: userPaymentDetails.amount,
          username: userPaymentDetails.username,
          email: userPaymentDetails.email,
          phone_number: userPaymentDetails.phone_number,
        });
      }, 3000);

      setTimeout(() => {
        window.location.href = './plan-history';
      }, 10000);
    });
  }
}

function createPlaymentDetail(url, prePostData) {
  const user = JSON.parse(localStorage.getItem('userToken'));
  fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Headers': 'x-access-token',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    mode: 'cors',
    body: JSON.stringify(prePostData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 201) {
        //MessageBoard.displayMsg('Form submitted succesfully');
        var notification = alertify.notify(
          `succesfully made payments for the ${prePostData.plan_id}.`,
          'success',
          5,
          function() {
            console.log('dismissed');
          },
        );

        // window.location.replace("https://demo-Goom Logistics-taxi-user.herokuapp.com/dashboard")
      } else if (data.status === 401 || data.status === 403) {
        window.location.href = './';
      } else {
        //MessageBoard.displayMsg(data.error);
        var notification = alertify.notify(
          'some error occured while making payments.',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    })
    .catch(error => {
      throw error;
    });
}

function getBalance() {
  const user = JSON.parse(localStorage.getItem('userToken'));
  return fetch(baseUrl + '/balance/' + user.user.email, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    mode: 'cors',
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        //var notification = alertify.notify('Successful balance .', 'success', 5, function(){  console.log('dismissed'); });

        console.log(data.data[0].accountBalance);
        let accountBalance = data.data[0].accountBalance;
        document.getElementById('balance').innerHTML = accountBalance;

        user.user.balance = accountBalance;

        localStorage.setItem('userToken', JSON.stringify(user));
      } else {
        var notification = alertify.notify(
          'Error updating wallet account. ',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    })
    .catch(error => {
      throw error;
    });
}

const updateAccountBalance = (url, dataRec) => {
  let user = JSON.parse(localStorage.getItem('userToken'));

  fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    mode: 'cors',
    body: JSON.stringify(dataRec),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        //user.user.balance = dataRec.oldBalance - dataRec.debit_amount;
        //localStorage.setItem('userToken', JSON.stringify(user))
        var notification = alertify.notify(
          'Successful updated on your wallet account.',
          'success',
          5,
          function() {
            console.log('dismissed');
          },
        );
      } else {
        console.log('update loc error');
        var notification = alertify.notify(
          'Error updating wallet account. ',
          'error',
          5,
          function() {
            console.log('dismissed');
          },
        );
      }
    });
};

const updateStatus = (url, dataRec) => {
  let user = JSON.parse(localStorage.getItem('userToken'));

  fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    mode: 'cors',
    body: JSON.stringify(dataRec),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        var notification = alertify.notify(
          'Successfully updated status ',
          'success',
          5,
          function() {
            console.log('dismissed');
          },
        );
      } else {
        console.log('update loc error');
        var notification = alertify.notify('Error updating status.', 'error', 5, function() {
          console.log('dismissed');
        });
      }
    });
};
