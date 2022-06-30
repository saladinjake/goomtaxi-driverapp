import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Profile extends Component {
  componentDidMount() {
    let mainNav;
    if (document.getElementById('loginpage')) {
      mainNav = document.getElementById('loggedInOnly');
      mainNav.style.display = 'none';
      mainNav.style.opacity = 0;
    }
  }

  change() {
    console.log('change');
  }

  render() {
    return (
      <div className="content-page" id="spread-out">
        <div className="content" id="profile-page">
          <div className="container" id="drivers-profile">
            <div className="row">
              <div className="col-sm-12">
                <h4 className="page-title">Profile Page</h4>
                <ol className="breadcrumb">
                  <li>
                    <a href="#">UserProfile</a>
                  </li>
                  <li>
                    <a href="#">Forms</a>
                  </li>
                  <li className="active">Form Validation</li>
                </ol>
              </div>
            </div>

            <div className="row" style={{ marginTop: '30px' }}>
              <div className="col-lg-6">
                <div className="card-box">
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

                  <form
                    action="#"
                    className="form-horizontal"
                    role="form"
                    data-parsley-validate
                    noValidate
                    encType="multipart/form-data"
                    method="post"
                  >
                    <div className="form-group">
                      <label htmlFor="profileImage" className="col-sm-4 control-label"></label>
                      <div className="col-sm-7">
                        <input
                          type="hidden"
                          id="avatar-url"
                          name="avatar-url"
                          defaultValue="./public/assets/images/avatar.png"
                        />
                        <img
                          id="preview"
                          style={{ border: '1px solid gray', width: '100px' }}
                          src="./public/assets/images/avatar.png"
                          alt="Avatar"
                          className="avatar"
                        />
                        <p id="status">Please select a file</p>

                        <div className="upload-btn-wrapper">
                          <input type="file" name="myfile" id="file-input" />
                          <label htmlFor="myfile">
                            <img
                              src="/public/assets/images/camera.png"
                              style={{ width: '50px', height: '50px' }}
                              id="clickme"
                            />
                          </label>
                        </div>

                        <ul id="displayImages"></ul>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="username" className="col-sm-4 control-label">
                        Username
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          required
                          parsley-type="text"
                          className="form-control"
                          id="username"
                        />
                      </div>
                    </div>
                    <div className="form-group" style={{ display: 'none' }}>
                      <label htmlFor="usertype" className="col-sm-4 control-label">
                        User Type
                      </label>
                      <div className="col-sm-7">
                        <select disabled className="form-control" id="user_type">
                          <option>Individual</option>
                          <option>Corperate</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="firstName" className="col-sm-4 control-label">
                        First Name
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          required
                          parsley-type="text"
                          className="form-control"
                          id="firstname"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName" className="col-sm-4 control-label">
                        Last Name
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          required
                          parsley-type="text"
                          className="form-control"
                          id="lastname"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName" className="col-sm-4 control-label">
                        Phone
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          required
                          parsley-type="text"
                          className="form-control"
                          id="phoneNumber"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="certificate" className="col-sm-4 control-label">
                        Self Drive Certificate
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="certificate"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="col-sm-4 control-label">
                        Email
                      </label>
                      <div className="col-sm-7">
                        <input
                          id="email"
                          type="email"
                          required
                          className="form-control"
                          required
                          parsley-type="email"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="hori-pass1" className="col-sm-4 control-label">
                        Password*
                      </label>
                      <div className="col-sm-7">
                        <input
                          id="password"
                          type="password"
                          placeholder="Password"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="hori-pass2" className="col-sm-4 control-label">
                        Confirm Password *
                      </label>
                      <div className="col-sm-7">
                        <input
                          data-parsley-equalto="#password-confirm"
                          type="password"
                          required
                          placeholder="Password"
                          className="form-control"
                          id="password-confirm"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-offset-4 col-sm-8">
                        <button
                          style={{
                            width: '100px',
                            fontSize: '14px',
                            float: 'left',
                            marginRight: '4px',
                          }}
                          id="new_content"
                          type="submit"
                          className="btn btn-primary waves-effect waves-light new_content"
                        >
                          Update
                        </button>
                        <button
                          style={{ width: '105px', fontSize: '14px' }}
                          id="new_content2"
                          type="reset"
                          className="btn btn-default waves-effect waves-light m-l-5 new_content2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-md-12 col-lg-6" style={{ float: 'right' }} id="content-download">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="clearfix"></div>
                    <hr />
                    <div className="row"></div>

                    <div className="row"></div>
                    <div style={{ paddingTop: '15px' }}></div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="m-t-10 pull">
                          <div className="col-sm-12 col-md-12">
                            <div className="widget-bg-color-icon card-box">
                              <div className="bg-icon bg-icon-custom pull-left">
                                <i className="md-directions-car text-custom"></i>
                              </div>
                              <div className="col-lg-6 pull-right text-right">
                                <h3 className="text-dark">
                                  <b className="" id="car-model"></b>
                                </h3>
                                <p className="text-muted" id="plate"></p>
                              </div>
                              <div className="clearfix"></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12">
                          <div className="widget-bg-color-icon card-box">
                            <div className="bg-icon bg-icon-custom pull-left">
                              <i className="md-star text-custom"></i>
                            </div>
                            <div className="col-lg-6 pull-right text-right">
                              <h3 className="text-dark">
                                <b className="">Average Ratings</b>
                              </h3>
                              <p className="text-muted" id="ratings"></p>
                            </div>
                            <div className="clearfix"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ paddingTop: '15px' }}></div>
                    <div className="row" style={{ borderRadius: '0px' }}></div>
                    <hr />
                    <div className="hidden-print"></div>
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

export default Profile;
