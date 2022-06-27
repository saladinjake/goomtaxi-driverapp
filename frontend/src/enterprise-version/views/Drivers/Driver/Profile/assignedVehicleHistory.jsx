import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from "react";
import $ from 'jquery';

class AssignedVehicleHistory extends Component {

    render() {  
        return [
            <React.Fragment>             
  {/* Start content */}
  <div className="content-page" id="spread-out">
    <div className="container" id="cars-assigned">
      {/* Page-Title */}
      <div className="row">
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
      <div className="row">
        <div className="col-lg-12">
          <div className="card-box">
            <h4 className="m-t-0 header-title">
              <b>Assigned Vehicle History</b>
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
                  </div>{" "}
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
                    <th>Date Created</th>
                                                <th>Car ID</th>
                                                <th>Make / Brand</th>
                                                <th>Model Name</th>
                                                <th>License Plate </th>
                                                <th>Car Year</th>
                                                <th>Color</th>

                                                
                                                <th>status</th>
                                                <th>Image</th>
                  </tr>
                </thead>
                <tbody id="tablebody1">
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
      </div>
    </div>{" "}
    {/* container */}
  </div>{" "}
  {/* content */}

            </React.Fragment>
            ];
      }
}

export default AssignedVehicleHistory;
