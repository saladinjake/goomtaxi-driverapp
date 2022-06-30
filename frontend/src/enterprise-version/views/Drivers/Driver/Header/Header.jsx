import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export class Header extends Component {
  toggleFullScreen(elem) {
    if (
      (document.fullScreenElement !== undefined && document.fullScreenElement === null) ||
      (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) ||
      (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
      (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)
    ) {
      if (elem.requestFullScreen) {
        elem.requestFullScreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  componentDidMount() {
    let tht = this;
    let mainNav;
    if (document.getElementById('loginpage') || document.getElementById('pass_forgot_page')) {
      mainNav = document.getElementById('loggedInOnly');
      mainNav.style.display = 'none';
      mainNav.style.opacity = 0;
    }

    if (!document.getElementById('loginpage') && !document.getElementById('signup_page')) {
      document.getElementById('notLoggedIn').style.display = 'none';
      const fullscreenclicker = document.getElementById('btn-fullscreen');
      fullscreenclicker.addEventListener('click', function(e) {
        tht.toggleFullScreen(document.body);
      });

      if (localStorage.getItem('userToken')) {
        let user = JSON.parse(localStorage.getItem('userToken'));
        let profile = document.getElementById('user-profile');

        document.getElementById('balance').innerHTML = '₦' + user.user.balance;
        document.getElementById('notifyCount').innerHTML = user.user.notification_count;
      }
    } else {
      document.getElementById('notLoggedIn').style.display = 'block';
    }
  }

  closeNav() {
    document.getElementById('closed').style.width = '80px';
    document.getElementById('spread-out').style.marginLeft = '60px';
    const allSpans = document.getElementsByClassName('span-hide');

    for (var i = 0; i < allSpans.length; i++) {
      allSpans[i].style.display = 'none';
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="menu-placement">menu</div>
      </React.Fragment>
    );
  }
}

export default Header;
