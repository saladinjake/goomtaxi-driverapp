import $ from 'jquery';
const validNameRegularExpression = /^[A-Za-z]{3,30}$/;
const othernamesRegularExpression = /^[a-zA-Z]'?([a-zA-Z]|\.| |-){4,}$/;
const usernameRegularExpression = /^[A-Za-z0-9]{3,20}$/;
const emailRegularExpression = /\S+@\S+\.\S+/;
const passwordRegularExpression = /^[A-Za-z0-9]{4,}$/;
const phoneNumberRegularExpression = /^(\+?234|0)?[789]\d{9}$/;
const validateLastnameRegex = /^[A-Za-z\d_-]+$/;

alertify.set('notifier', 'position', 'bottom-right');
class Validator {
  static validatePassword(password, confirmPassword) {
    if (password === confirmPassword) {
      return true;
    }

    var notification = alertify.notify('Password do not match.', 'error', 5, function() {
      console.log('dismissed');
    });

    return false;
  }

  static validatePlanPost({ plan_name, plan_categories, price, description, status, max_car }) {
    alertify.set('notifier', 'position', 'top-right');

    let hasBeenValidated = true;
    if (!plan_name.length) {
      hasBeenValidated = false;
      console.log('fn err');
      var notification = alertify.notify('Invalid plan name', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!plan_categories.length) {
      hasBeenValidated = false;
      console.log('ln err');
      var notification = alertify.notify('Invalid plan category', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (price.indexOf(',')) {
      price = price.replace(',', '');
    }

    if (max_car.indexOf(',')) {
      //max_car = max_car.replace(',','')
    }

    if (isNaN(price)) {
      hasBeenValidated = false;
      console.log('ot err');
      var notification = alertify.notify('Invalid price', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!description.length) {
      hasBeenValidated = false;
      console.log('ot err');
      var notification = alertify.notify('Invalid Plan description', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!isNaN(max_car)) {
    } else if (max_car === 'unlimited') {
    } else {
      hasBeenValidated = false;
      console.log('ot err');
      var notification = alertify.notify('Invalid car value', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!status.length) {
      hasBeenValidated = false;
      console.log('em err');
      var notification = alertify.notify('Invalid status', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    return hasBeenValidated;
  }

  static validateSignup({
    firstname,
    lastname,
    username,
    email,
    password,
    passwordComfirm,
    phoneNumber,
    avatar,
    certificate,
    user_type,
    status,
  }) {
    alertify.set('notifier', 'position', 'top-right');

    let hasBeenValidated = true;
    if (!validNameRegularExpression.test(firstname)) {
      hasBeenValidated = false;
      console.log('fn err');
      var notification = alertify.notify('Invalid firstname', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!validateLastnameRegex.test(lastname)) {
      hasBeenValidated = false;
      console.log('ln err');
      var notification = alertify.notify('Invalid lastname', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!othernamesRegularExpression.test(user_type)) {
      hasBeenValidated = false;
      console.log('ot err');
      var notification = alertify.notify('Invalid usertype', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!usernameRegularExpression.test(username)) {
      hasBeenValidated = false;
      console.log('un err');
      var notification = alertify.notify('Invalid username', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!emailRegularExpression.test(email)) {
      hasBeenValidated = false;
      console.log('em err');
      var notification = alertify.notify('Invalid email', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!phoneNumberRegularExpression.test(phoneNumber)) {
      hasBeenValidated = false;
      console.log('ph err');
      var notification = alertify.notify('Invalid phone number', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    if (!passwordRegularExpression.test(password)) {
      hasBeenValidated = false;
      console.log('pw err');
      var notification = alertify.notify('Invalid password', 'error', 5, function() {
        console.log('dismissed');
      });
    }

    // if (password === passwordComfirm) {
    //   hasBeenValidated = true;
    //   console.log(password);
    //   console.log(passwordComfirm)

    // }else{
    //   console.log(password);
    //   console.log(passwordComfirm)
    //     console.log('pw do not mtchh err')
    //   var notification = alertify.notify('Password do not match.', 'error', 5, function(){  console.log('dismissed'); });
    //   hasBeenValidated = false;
    // }
    return hasBeenValidated;
  }

  static triggerValidation() {
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('me-password').value;

    const confirmPassword = document.getElementById('confirmPassword').value;

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;

    //const othernames = document.getElementById('othernames').value;
    var user_typeSelect = document.getElementById('user_type');
    const user_type = user_typeSelect.options[user_typeSelect.selectedIndex].text;

    const info = {
      firstname,
      lastname,
      username,
      email,
      password,
      passwordComfirm,
      phoneNumber,
      //avatar,
      certificate,
      user_type,
      status,
    };

    const isValid = Validator.validateSignup(info);
    if (!isValid) {
      console.log('false from HelpWithSignUp.validateSignup(info)');
      return false;
    }

    return info;
  }
}

export default Validator;
