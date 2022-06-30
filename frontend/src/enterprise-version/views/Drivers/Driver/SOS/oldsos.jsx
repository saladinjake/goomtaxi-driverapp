import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CarRepairRequest extends Component {
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
        <div className="content-page" id="spread-out">
          <div className="content" id="sos-page">
            <div className="container">
              <div className="row">
                <div className="col-lg-12" id="hide-on-click">
                  <div className="card-box">
                    <div className="row m-t-40 m-b-40 align-items-center justify-content-center">
                      <div className="center-block text-center col-lg-12 m-b-50">
                        <h2 className=" m-t-20 m-b-40 text-danger">REPORT SOS</h2>
                        <div style={{ padding: '10px 0' }}></div>
                        <h4 className="text-dark header-title m-t-20 m-b-30">
                          Are you sure you want to report a distress call ?
                        </h4>
                        <p className="text-muted m-b-40 font-13"></p>
                        <div style={{ padding: '10px 0' }}></div>
                        <div className="m-t-30 p-t-30">
                          <div className="col-lg-3"></div>
                          <div className="col-lg-3 text-center">
                            <button
                              id="get-location-btn"
                              type="submit"
                              className="btn btn-danger btn-block btn-lg w-sm waves-effect waves-light"
                            >
                              Yes
                            </button>
                          </div>
                          <div className="col-lg-3 text-center">
                            <button
                              id="cancle-sos"
                              type="submit"
                              className="btn btn-custom btn-lg btn-purple btn-block w-sm waves-effect waves-light"
                            >
                              No
                            </button>
                          </div>
                          <div className="col-lg-3"></div>
                        </div>
                      </div>

                      <div className="hidden-sm hidden-xs" style={{ padding: '200px 0px' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" id="show-map">
                <div className="col-md-11 col-sm-11 col-xs-11">
                  <div className="panel panel-default">
                    <div className="panel-heading">Location Response</div>
                    <div className="info-msg">
                      <i className="fa fa-info-circle"></i>
                    </div>

                    <div className="success-msg" id="msg">
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="warning-msg">
                      <i className="fa fa-warning"></i>
                    </div>

                    <div className="error-msg" id="msg-err">
                      <i className="fa fa-times-circle"></i>
                    </div>
                    <div className="panel-body">
                      <p style={{ display: 'none' }}>
                        Lat/Long: <span id="location-lat-long" className="form-control"></span>
                      </p>
                      <p style={{ display: 'none' }}>
                        Address:{' '}
                        <span id="location-address" type="text" className="form-control">
                          {' '}
                        </span>
                      </p>
                      <p>Map:</p>
                      <div id="map-container" style={{ height: '400px' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="toast">
          <div id="desc">A notification message..</div>
        </div>
      </React.Fragment>
    );
  }
}

export default CarRepairRequest;
