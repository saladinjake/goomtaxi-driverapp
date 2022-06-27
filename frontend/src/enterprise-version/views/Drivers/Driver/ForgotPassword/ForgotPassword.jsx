/* eslint-disable global-require */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


export class ForgotPassword extends Component {
  componentDidMount() {
    

     let mainNav;
    if (document.getElementById("loginpage") ) {
            mainNav = document.getElementById("loggedInOnly");
            mainNav.style.display="none";
            mainNav.style.opacity=0;

          }

    

   



  }
  render() {
   const style1 ={
   position: "absolute",
   marginLeft:"-50px",
    width:"300px",
    padding:"15px",
    color:"#000"
   };

   const style2={
    width: "100%",
     maxWidth: "540px",
     boxSizing: "border-box",

   
   }
    return (

    <React.Fragment>
      <div id="pass_forgot_page">
    <div className="account-pages" ></div>
    <div className="clearfix"></div>
    <div className="wrapper-page" id="recovery-drivers">
      <div className=" card-box">
        <div className="panel-heading">
          <h3 className="text-center"> Reset Password </h3>
        </div>

        

                  <div className="info-msg">
                    <i className="fa fa-info-circle"></i>  
                  </div>

                  <div className="success-msg" id="msg-suc">
                    <i className="fa fa-check"></i>
                  </div>

                  <div className="warning-msg">
                    <i className="fa fa-warning"></i>
                  </div>

                  <div className="error-msg" id="msg" >
                    <i className="fa fa-times-circle"></i>
                  </div>


        <div className="success-checkmark"  id="success-mark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
              
                <p style={style1}>A verification email was sent to you</p>
            
               </div>

        <div className="panel-body">
          <form method="post" id="e-form" action="http://localhost:12000/api/v1/auth/forgot_password" role="form" className="text-center">
            <div className="alert alert-info alert-dismissable">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">
                ×
              </button>
              Enter your <b>Email</b> and instructions will be sent to you!
            </div>
            <div className="form-group m-b-0">
              
               <div className="col-xs-12 col-md-12 col-sm-12">
                <div className="form-group" id="username-container">
                    <input style={style2} className="form-control" type="text" id="email" className="form-control" placeholder="Enter Email" required="" />
                </div>
             
              
                  <input  id="reset_btn" type="submit" style={{width:"80px", fontSize:"12px", margin:"0px auto", fontSize: "14px",marginBottom:"13px"}} href="./itinerary-history" className="btn btn-primary  w-md cd-add-to-cart js-cd-add-to-cart" value="Reset" />
                  <br/>
              </div>
            </div>
             <br/>    <br/>
             
            
            <div className="row m-t-30">
            <div className="col-sm-12 text-center">
              <p>
                <a href="./dasboard-drivers" className="text-primary m-l-5"><b>I remember my password</b></a>
              </p>
            </div>
            </div>

          </form>
        </div>
      </div>
      

    </div>
</div>

</React.Fragment>
    );
  }
}



export default ForgotPassword;
