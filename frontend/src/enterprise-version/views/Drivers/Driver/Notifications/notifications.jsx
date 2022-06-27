import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from "react";
import $ from 'jquery';

class NotificationsContent extends Component {

    render() {  
        return [
            <React.Fragment>  
  <div className="content-page page-wrap" id="spread-out">
    <div className="container" id="notice">
      {/* Page-Title */}
      <div className="row">
        <div className="col-sm-12">
          <h4 className="page-title" />
          <ol className="breadcrumb">
            <li>
              <a href="#">App</a>
            </li>
            <li>
              <a href="#">UI Kit</a>
            </li>
            <li className="active">Tabs &amp; Accordions</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card-box">
            <h4 className="m-t-0 header-title">
              <b>Notifications</b>
            </h4>
            <p className="text-muted m-b-30 font-13"></p>
            
              <nav className="accordion arrows" style={{marginTop: "50px"}}>
                <header className="box-accordion">
                  <label for="acc-close" className="box-accordion-title">Notification menu</label>
                </header>
                <div id="addAcc"></div>
                
                <input type="radio" name="accordion" id="acc-close" />
              </nav>

          </div>
        </div>
      </div>{" "}
      {/* end row */}
    </div>{" "}
    {/* container */}
  </div>{" "}
  {/* content */}
  <footer className="footer">© 2019. All rights reserved.</footer>
            </React.Fragment>
            ];
      }
}

export default NotificationsContent;
