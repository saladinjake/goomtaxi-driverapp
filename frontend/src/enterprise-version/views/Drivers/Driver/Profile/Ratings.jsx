import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ratings.css';

export class DriverRatings extends Component {
  componentDidMount() {
    let mainNav;
    if (document.getElementById('loginpage')) {
      mainNav = document.getElementById('loggedInOnly');
      mainNav.style.display = 'none';
      mainNav.style.opacity = 0;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="column-sos">
          <div className="content-page " id="spread-out">
            <div className="content" id="driver-ratings">
              <div className="container">
                <div className="row">
                  <div className="smileybox">
                    <h1 className="text-center">Driver Rating </h1>

                    <div id="Class">
                      <img
                        src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg"
                        className="profile-img"
                      />
                      <div className="profile-text">
                        <h1 className="profile-name text-center">Jonathan Doe</h1>
                        <h6 className="text-center">Goom Logistics Taxi Service</h6>
                      </div>
                      <div className="rate text-center">
                        <label for="r1" className="check">
                          <input type="checkbox" id="r1" />
                          <i className="em em-weary"></i>
                        </label>
                        <label for="r2" className="check">
                          <input type="checkbox" id="r2" />
                          <i className="em em-worried"></i>
                        </label>
                        <label for="r3" className="check">
                          <input type="checkbox" id="r3" />
                          <i className="em em-blush"></i>
                        </label>
                        <label for="r4" className="check">
                          <input type="checkbox" id="r4" />
                          <i className="em em-smiley"></i>
                        </label>
                        <label for="r5" className="check">
                          <input type="checkbox" id="r5" />
                          <i className="em em-sunglasses"></i>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{' '}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DriverRatings;
