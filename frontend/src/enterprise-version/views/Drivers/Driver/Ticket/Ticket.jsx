import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class TicketRequest extends Component {
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
      <div className="content-page" id="spread-out">
        <div className="content">
          <div className="container">
            <div className="row" id="create-ticket">
              <div className="col-sm-12">
                <div className="card-box">
                  <h4 className="m-t-0 header-title ">
                    <b>Create Support Tickets</b>
                  </h4>
                  <p className="text-muted m-b-10 font-18">
                    Send your feedback, issues and messages. We will get back to you within 48
                    hours.
                  </p>

                  <div className="info-msg">
                    <i className="fa fa-info-circle"></i>
                  </div>

                  <div className="success-msg" id="msg-suc">
                    <i className="fa fa-check"></i>
                  </div>

                  <div className="warning-msg">
                    <i className="fa fa-warning"></i>
                  </div>

                  <div className="error-msg" id="msg">
                    <i className="fa fa-times-circle"></i>
                  </div>

                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="card-box">
                        <div className="row">
                          <div className="col-md-12">
                            <h4 className="m-t-0 header-title">
                              <b></b>
                            </h4>
                            <p className="text-muted m-b-10 font-13"></p>

                            <form role="form">
                              <div className="form-group">
                                <label className="control-label">Select Support Category</label>
                                <div>
                                  <select id="select" className="form-control">
                                    <option>General Enquiries</option>
                                    <option>Technical Support</option>
                                    <option>Feedback</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlhtmlFor="exampleInputEmail1">Subject</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="subject"
                                  placeholder="Enter Subject"
                                />
                              </div>

                              <div className="form-group location-div">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="findme"
                                  placeholder="Enter location"
                                  style={{ display: 'none' }}
                                />
                                <a
                                  href="#"
                                  id="get-currentloc"
                                  className="location-btn auto-get-loc"
                                  style={{ display: 'none' }}
                                >
                                  Use current location
                                </a>
                                <p id="location-code" style={{ display: 'none' }}></p>
                              </div>

                              <div className="form-group">
                                <label className="control-label">Description</label>
                                <div className="">
                                  <textarea
                                    id="comment"
                                    className="form-control"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </div>

                              <div className="form-group">
                                <label className="control-label">Upload file ( optional )</label>
                                <input
                                  type="file"
                                  className="filestyle"
                                  data-iconname="fa fa-cloud-upload"
                                  id="filestyle-6"
                                  tabIndex="-1"
                                  style={{ position: 'absolute', height: '80px', fontSize: '12px' }}
                                />
                                <div className="bootstrap-filestyle input-group">
                                  <input
                                    type="text"
                                    className="form-control "
                                    placeholder=""
                                    disabled
                                  />{' '}
                                  <span
                                    className="group-span-filestyle input-group-btn"
                                    tabIndex="0"
                                  >
                                    <label
                                      style={{ height: '38px', fontSize: '12px' }}
                                      htmlFor="filestyle-6"
                                      className="btn btn-default "
                                    >
                                      <span className="icon-span-filestyle fa fa-cloud-upload"></span>{' '}
                                      <span
                                        style={{ height: '20px', fontSize: '12px' }}
                                        className="buttonText"
                                      >
                                        Choose file
                                      </span>
                                    </label>
                                  </span>
                                </div>
                              </div>
                              <div id="filename-view"></div>

                              <button
                                id="new_content"
                                type="submit"
                                className="btn  btn-purple btn-block btn-lg waves-effect waves-light new_content"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 hidden-xs hidden-sm">
                      <div className="center-block">
                        <img
                          src="public/assets/images/create-ticket.jpg"
                          className="img-responsive"
                        />
                      </div>
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

export default TicketRequest;
