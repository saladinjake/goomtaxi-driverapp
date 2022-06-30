import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import $ from 'jquery';

class UpcomingTripsContent extends Component {
  render() {
    return [
      <React.Fragment>
        <div className="content-page" id="spread-out">
          <div className="container" id="trips-assigned">
            {/* Page-Title */}
            <div className="row" id="">
              <div className="col-sm-12">
                <h4 className="page-title" />
                <ol className="breadcrumb">
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li className="active">Drivers</li>
                </ol>
              </div>
            </div>
            <div className="row" id="first-view">
              <div className="col-lg-12">
                <div className="card-box">
                  <h4 className="m-t-0 header-title">
                    <b>Upcoming Trips</b>
                  </h4>
                  <p className="text-muted m-b-30 font-13"></p>
                  <div className="row">
                    <div className="col-sm-3 pull-right m-r-10">
                      <form role="form">
                        <div className="form-group contact-search m-b-30">
                          <input
                            type="text"
                            id="search"
                            className="form-control"
                            placeholder="Search..."
                          />
                          <button type="submit" className="btn btn-white">
                            <i className="fa fa-search" />
                          </button>
                        </div>{' '}
                        {/* form-group */}
                      </form>
                    </div>
                    <div className="col-sm-4">
                      {/* <a href="#custom-modal"
											class="btn btn-default btn-md waves-effect waves-light m-b-30"
											data-animation="fadein" data-plugin="custommodal" data-overlaySpeed="200"
											data-overlayColor="#36404a"><i class="md md-add"></i> Add Drivers</a> */}
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover mails m-0 table table-actions-bar">
                      <thead>
                        <tr>
                          <th className="col-lg-2">Date Time</th>

                          <th>User Name</th>
                          <th>User Email</th>
                          <th className="">Pickup Location</th>
                          <th className="">Destination</th>
                          <th className="">Status</th>
                          <th>Rating</th>
                          <th style={{ minWidth: 90 }}>Action</th>
                        </tr>
                      </thead>
                      <tbody id="tablebody1"></tbody>
                    </table>
                  </div>
                </div>
              </div>{' '}
              {/* end col */}
            </div>
          </div>{' '}
          {/* container */}
        </div>{' '}
        {/* content */}
        <div style={{ display: 'none' }} className="content-page" id="second-view">
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 card-box">
                  <div className="col-lg-2 pull-left">
                    <a
                      href="#"
                      className="btn btn-default waves-effect waves-light pull-left m-b-10 gobackFor"
                    >
                      <i className="md  md-chevron-left"></i> Back to List
                    </a>{' '}
                  </div>
                  <div className="col-lg-8">
                    <h4 className="m-b-10 header-title">
                      Trip Detail{' '}
                      <span className="m-l-10 text-purple font-13">
                        <b id="user-id"></b>
                      </span>
                    </h4>
                  </div>
                  <div className="col-lg-2 pull-right">
                    <div className="btn-group pull-right m-t-0"></div>{' '}
                  </div>
                  <div className="clearfix"></div>
                  <div className="m-t-10" style={{ border: '1px solid #4c3392' }}></div>
                  <div className="col-lg-6 m-t-10">
                    <div className="card-box">
                      <div id="modalbody1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>,
    ];
  }
}

export default UpcomingTripsContent;
