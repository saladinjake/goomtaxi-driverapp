import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItineraryHistoryList from '../History/ItineraryHistoryList';

const activeUrl = 'https://goomtaxibackendapi.herokuapp.com/api/v1';

export default class SubmittedTicket extends Component {
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
      <div className="content-page page-wrap" id="spread-out">
        <div className="content" id="view-repairs">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card-box">
                  <h4 className="text-dark header-title m-t-0">Car Repair History</h4>
                  <p className="text-muted m-b-30 font-13"></p>

                  <div className="table-responsive card-box">
                    <br />
                    <div className="col-sm-6 text-lg-center text-right pull-right">
                      <div className="form-group">
                        <input
                          id="foo-table-input"
                          type="text"
                          placeholder="Search by location"
                          className="form-control input-sm"
                          autocomplete="on"
                        />
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="m-t-10" style={{ border: '1px solid #4c3392' }}></div>
                    <table
                      id="demo-foo-pagination"
                      data-page-size="5"
                      data-search="true"
                      className="table toggle-circle table-hover"
                    >
                      <thead>
                        <tr>
                          <th data-toggle="true">User ID</th>
                          <th data-hide="phone">Location</th>
                          <th data-hide="phone"> Car Brand</th>
                          <th data-hide="phone">Request Date</th>
                          <th data-hide="all">Status</th>
                        </tr>
                      </thead>
                      <tbody id="fetched-data-repair"></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          id="portfolio"
          style={{ textAlign: 'center', fontSize: '15px' }}
          href="./drivers-request-car-repair"
          className="link-to-portfolio hover-target"
        >
          <i class="md md-add text-info"></i>
        </a>
      </div>
    );
  }
}
