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
          <div className="content" id="car-repair">
            <div className="container">
              <div className="m-t-15"></div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="card-box">
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="m-t-0 header-title">
                          <strong>Request Car Repair</strong>
                        </h4>
                        <div className="m-b-30"></div>

                        <form role="form">
                          <div className="form-group" style={{ display: 'none' }}>
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="user@email.com"
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-lg-6" style={{ display: 'none' }}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstname"
                                  placeholder="Adams"
                                  readOnly
                                />
                              </div>
                              <div className="col-lg-6" style={{ display: 'none' }}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastname"
                                  placeholder="Jackson"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                              type="text"
                              className="form-control"
                              id="findme"
                              placeholder="Third Mainland Bridge"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="carBrand">Car Brand</label>
                            <select className="form-control select2" id="carbrand">
                              <option>Select</option>
                              <optgroup label="Mercedez Benz">
                                <option value="AK">C 300</option>
                                <option value="HI">E 350</option>
                                <option value="HI">GL 450</option>
                                <option value="HI">GL 550</option>
                              </optgroup>

                              <optgroup label="Lexus">
                                <option value="AZ">RX 250</option>
                                <option value="CO">Rx 300</option>
                                <option value="ID">RX 370</option>
                                <option value="MT">GX 460</option>
                              </optgroup>
                              <optgroup label="BMW">
                                <option value="AL">X6</option>
                                <option value="AR">X5</option>
                                <option value="IL">X4</option>
                                <option value="IA">X3</option>
                              </optgroup>
                              <optgroup label="Toyota">
                                <option value="CT">Camry 2015</option>
                                <option value="DE">Corolla 2018</option>
                                <option value="FL">Corolla 2016</option>
                                <option value="GA">Avalon 2019</option>
                              </optgroup>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="issueNoticed">Issue Noticed</label>
                            <textarea
                              id="description"
                              className="form-control"
                              maxLength="225"
                              rows="2"
                              placeholder="This textarea has a limit of 225 chars."
                            ></textarea>
                          </div>

                          <div className="form-group">
                            <label className="control-label">Upload Image</label>
                            <input
                              type="file"
                              className="filestyle"
                              data-placeholder="No file"
                              id="image-file"
                            />
                          </div>

                          <button
                            id="new_content"
                            className="btn btn-primary waves-effect waves-light  new_content"
                            style={{ width: '160px', fontSize: '14px', marginRight: '12px' }}
                          >
                            Submit Request
                          </button>
                        </form>
                      </div>

                      <div className="col-md-8">
                        <div className="m-t-40"></div>
                        <img
                          className="m-b-30 mechanic-img mech-img"
                          src="public/assets/images/mechanic2.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="con-close-modal"
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
          style={{ display: 'none' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
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

                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  ×
                </button>
                <h4 id="title-header" className="modal-title"></h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="field-1" className="control-label">
                        Firstname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="field-1"
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="field-2" className="control-label">
                        Lastname
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="field-2"
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="field-3" className="control-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="field-3"
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="field-4" className="control-label">
                        Location
                      </label>
                      <input type="text" className="form-control" id="field-4" placeholder="" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="field-5" className="control-label">
                        Brand
                      </label>
                      <input type="text" className="form-control" id="field-5" placeholder="" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="field-6" className="control-label">
                        Unique Id
                      </label>
                      <input type="text" className="form-control" id="field-6" placeholder="" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group no-margin">
                      <label htmlFor="field-7" className="control-label">
                        Personal Info
                      </label>
                      <textarea
                        className="form-control autogrow"
                        id="field-7"
                        placeholder="Write something about yourself"
                        style={{
                          overflow: 'hidden',
                          wordWrap: 'breakWord',
                          resize: 'horizontal',
                          height: '104px',
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-info waves-effect waves-light update">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CarRepairRequest;
