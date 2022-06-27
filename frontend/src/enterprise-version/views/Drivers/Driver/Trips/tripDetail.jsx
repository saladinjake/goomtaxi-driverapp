import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from "react";
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
//import BrowserHistory from 'react-router/lib/BrowserHistory';

class TripDetailContent extends Component {

  componentDidMount() {
    //console.log('I am mounted!');
    $("#goback").click(function(e){
      //console.log(e);
      window.history.back(); 
    });
  }

    render() {  
        return [
            <React.Fragment>  
  <div className="content-page" id="spread-out">
    <div className="container">
      {/* Page-Title */}
      <div className="row">
        <div className="col-lg-12 card-box">
          <div className="col-lg-2 pull-left">
            <a
              href
              id="goback"
              className="btn btn-default waves-effect waves-light pull-left m-b-10"
            >
              <i className="md  md-chevron-left" />
              <span className="hidden-xs hidden-sm"> Back to List</span>
            </a>{" "}
          </div>
          <div className="col-lg-8 pull-left">
            <h4 className="m-b-10 header-title">
              Trip Detail{" "}
              <span className="m-l-10 text-purple font-13">
                <b>CMTTP2020005</b>
              </span>
            </h4>
          </div>
          <div className="col-lg-2 hidden-sm hidden-xs pull-right">
            {/* <div class="btn-group pull-right m-t-0">
									<button type="button" class="btn btn-inverse dropdown-toggle waves-effect waves-light"
										data-toggle="dropdown" aria-expanded="false">Options <span class="m-l-5"><i
												class="md md-expand-more"></i></span></button>
									<ul class="dropdown-menu drop-menu-right" role="menu">
										<li><a href="#">Delete</a></li>
										<li><a href="#">Another action</a></li>
										<li><a href="#">Something else here</a></li>
										<li class="divider"></li>
										<li><a href="#">Separated link</a></li>
									</ul>
								</div> */}{" "}
          </div>
          <div className="clearfix" />
          <div className="m-t-10" style={{ border: "1px solid #4c3392" }} />
          <div className="col-lg-6 m-t-10" style={{}}>
            <div className>
              {/* <h4 class="m-t-0 header-title"><b>Horizontal Form</b></h4>
										<p class="text-muted font-13 m-b-30">
											Your awesome text goes here.
										</p> */}
              <form
                className="form-horizontal"
                data-parsley-validate
                noValidate
              >
                <div className="form-group col-sm-12">
                  <label htmlFor className="col-sm-4 control-label">
                    Status
                  </label>
                  <div className="col-sm-7">
                    <select className="form-control" disabled>
                      <option>Pending</option>
                      <option>Ongoing</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label
                    htmlFor="username"
                    className="col-sm-4 control-label text-left"
                  >
                    Date
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      required
                      parsley-type="text"
                      className="form-control"
                      id="username"
                      disabled
                      placeholder="14 Jan 2020"
                    />
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor className="col-sm-4 control-label">
                    Time
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      required
                      parsley-type="text"
                      className="form-control"
                      id="username"
                      disabled
                      placeholder="2:15 pm"
                    />
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="amount" className="col-sm-4 control-label">
                    City Option
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      required
                      disabled
                      parsley-type="text"
                      className="form-control"
                      placeholder="Inter-City"
                    />
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor className="col-sm-4 control-label">
                    User Name
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      required
                      disabled
                      parsley-type="text"
                      className="form-control"
                      id
                      defaultValue="Jane Doe"
                    />
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-4 control-label"
                  >
                    Email Address
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="email"
                      required
                      disabled
                      parsley-type="email"
                      className="form-control"
                      id="inputEmail3"
                      defaultValue="jane.doe@email.com"
                    />
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor className="col-sm-4 control-label">
                    Phone Number
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      required
                      disabled
                      parsley-type="text"
                      className="form-control"
                      id
                      placeholder="0801 456 9874"
                    />
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="amount" className="col-sm-4 control-label">
                    Pickup Location
                  </label>
                  <div className="col-sm-7">
                    <textarea
                      className="form-control autogrow"
                      disabled
                      id="inputCarDescription"
                      placeholder="Block 2, Osborne foreshore, Lekki Phase 2,Lagos."
                      style={{
                        overflow: "hidden",
                        wordWrap: "break-word",
                        resize: "horizontal",
                        height: 80
                      }}
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="amount" className="col-sm-4 control-label">
                    Destination
                  </label>
                  <div className="col-sm-7">
                    <textarea
                      className="form-control autogrow"
                      disabled
                      id="inputCarDescription"
                      placeholder="Block 2, Osborne foreshore, Lekki Phase 2,Lagos."
                      style={{
                        overflow: "hidden",
                        wordWrap: "break-word",
                        resize: "horizontal",
                        height: 80
                      }}
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor className="col-sm-4 control-label">
                    Rating
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      required
                      disabled
                      parsley-type="text"
                      className="form-control"
                      id
                      placeholder
                    />
                  </div>
                </div>
                {/* <div class="form-group">
											<div class="col-sm-offset-4 col-sm-8">
												<button type="submit" class="btn btn-primary waves-effect waves-light">
													Save Changes
												</button>
												<button type="reset" class="btn btn-default waves-effect waves-light m-l-5">
													Cancel Changes
												</button>
											</div>
										</div> */}
              </form>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col-sm-12" />
          <div className="col-md-2 col-lg-2 col-sm-12">
            {/*	<div class="m-t-30 center-block text-center">
								<div class="m-t-10 col-sm-12"><a href="#"
									class="btn btn-default btn-block w-lg waves-effect w-lg btn-custom waves-light m-b-10">View Plan</a> </div>

	
							</div> */}
          </div>
        </div>
      </div>
    </div>{" "}
    {/* container */}
  </div>{" "}
  {/* content */}
  <footer className="footer text-right">© 2019. All rights reserved.</footer>
            </React.Fragment>
            ];
      }
}

export default TripDetailContent;
