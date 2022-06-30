import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const activeUrl = 'https://goomtaxibackendapi.herokuapp.com/api/v1';

export default class FAQ extends Component {
  componentDidMount() {
    let mainNav;
    if (document.getElementById('loggedInOnly')) {
      mainNav = document.getElementById('loggedInOnly');
      mainNav.style.display = 'block';
      mainNav.style.opacity = 1;
    }
  }

  render() {
    const style1 = {
      visibility: 'hidden',
      display: 'none',
    };
    return (
      <div className="content-page" id="map-track">
        <div className="content" id="spread-out">
          <div className="container" id="admin" data-pageid="admin-map">
            <div className="">
              <div>
                <div className="row">
                  <div className="">
                    <div className="">
                      <h4 className="m-t-0 m-b-20 header-title">
                        <b>Goom Logistics Taxi Map</b>
                      </h4>

                      <div id="gmaps-types" className="gmaps" style={{ height: '100vh' }}></div>
                      <div id="error"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
