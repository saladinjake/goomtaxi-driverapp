/* eslint-disable global-require */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


export class Register extends Component {
  componentDidMount() {
     document.getElementsByTagName("body")[0].style.backgroundColor="#fff";
     let mainNav;
     if (document.getElementById("loggedInOnly") ) {
            mainNav = document.getElementById("loggedInOnly");
            mainNav.style.display="none"
            mainNav.style.opacity=0;

    }else{
      mainNav.style.display="none"
    }

   



  }
  render() {
    const styleM= { background:'#fff url("public/assets/images/products/home2.jpg") no-repeat fixed left', backgroundSize:'contain', height:"100%",position:"fixed"};  
    const styleY = {padding:"43% 0px" };
    return (
       <React.Fragment>
          

            <div className="col-lg-8 col-md-6 hidden-md-down hidden-xs hidden-sm "   id="signup_page" style={styleM}>
              <div style={styleY} ></div>
            </div>
            
          
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pull-right p-l-0 p-r-0" style={{background: "#fff", height:"100%"}}>
            

      <div className="card-box p-l-0 p-r-0" id="drivers-signup">
        <div className="panel-heading p-b-0">
          <h1 className="text-custom m-t-40 m-b-20 text-left" style={{ fontWeight:"700", letterSpacing:"3px"}}>Sign up</h1>
                <a href="/" className="btn-link" style={{textDecoration:"none"}}>or log in to your account</a>
        </div>



               


        <div className="panel-body p-t-0" style={{height:"100%",background:"#fff"}}  >

                   <div id="success-mark" style={{marginTop:"100px"}}>
                    <br/><br/>
                      <div className="success-checkmark" >
                          <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                          </div>
                          
                        </div>
                        <center>
                          <h5 id="restart">An Email verification has been sent.</h5>
                        </center>
                        <br/><br/><br/><br/><br/><br/>
                   </div>

                    

          <form id="sign-form"  className="form m-t-10" method="POST" action="https://goomtaxibackendapi.herokuapp.com/api/v1/auth/drivers-signup">

              

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
      
            

                          
            <div className="row col-md-12 col-lg-12 ">
              <div className="col-xs-12 col-md-6 col-sm-6">
                <div className="form-group" id="email-container">
                <input className="form-control" name="email" id="email" type="email" required="" placeholder="Email" />
                </div>
              </div>

            
              <div className="col-xs-12 col-md-6 col-sm-6">
                <div className="form-group" id="phoneNumber-container">
                <input className="form-control" name="phoneNumber" id="phoneNumber" type="text" required="" placeholder="Phone Number" />
                </div>
              </div>
            </div>
            
            <div className="row col-md-12 col-lg-12 ">
              <div className="col-xs-12 col-md-6 col-sm-6">
                <div className="form-group" id="firstname-container">
                <input className="form-control" name="firstname" id="firstname" type="text" required="" placeholder="First Name" />
                </div>
              </div>
            
            
              <div className="col-xs-12 col-md-6 col-sm-6">
                <div className="form-group" id="lastname-container">
                <input className="form-control" name="lastname" id="lastname" type="text" required="" placeholder="Last Name" />
                </div>
              </div>
            </div>
            
            <div className="row col-md-12 col-lg-12 ">
              <div className="col-xs-12 col-md-6 col-sm-6">
                <div className="form-group" id="password-container">
                <input className="form-control" name="me-password" id="me-password" type="password" required="" placeholder="Password" />
                 <span toggle="#me-password" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                </div>
              </div>
            
            
              <div className="col-xs-12 col-md-6 col-sm-6">
                <div className="form-group" id="confirm-password-container">
                <input className="form-control" name="confirmPassword" id="confirmPassword" type="password" required="" placeholder="Confirm Password" />
                <span toggle="#confirmPassword" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                </div>
              </div>
            </div>
            
            <div className="row col-md-12 col-lg-12 ">
              <div className="col-xs-12 col-md-6 col-sm-6">
                <div className="form-group" id="username-container">
                <input className="form-control" name="username" id="username" type="text" required="" placeholder="Username" />
                </div>
              </div>
            
            
              <div className="col-xs-12 col-md-6 col-sm-6">
                <div className="form-group">
                <select className="form-control" name="user_type" id="user_type" defaultValue="Select Category">
                          <option disabled >Select Category</option>
                          <option>Individual</option>
                          <option>Corporate</option>
                  </select>
                </div>
              </div>
            </div>



            
            

            <div className="form-group">
              <div className="col-xs-12">
                <div className="checkbox checkbox-primary">
                  <input id="checkbox-signup" type="checkbox"   />
                  <label htmlFor="checkbox-signup">I accept <a href="#" data-toggle="modal" data-target="#myModal">Terms and Conditions</a></label>
                </div>
              </div>
            </div>

            <div className="form-group text-center m-t-40">
              <div className="col-xs-12">
                <button style={{backgroundColor: "#7e57c2"}} id="signup_btn" className="btn btn-info btn-block text-uppercase waves-effect waves-light btn-facebook waves-effect waves-light m-t-20" type="submit">
                  Register
                </button>
              </div>
            </div>
            
            <div className="form-group m-t-20 m-b-0">
              <div className="col-sm-12 text-center">
                <h4><b>Sign Up with</b></h4>
              </div>
            </div>
            
            <div className="form-group m-b-0 text-center">
              <div className="col-sm-12">
                 <a style={{width:"60px",marginRight:"5px", height:"40px"}}  href="https://goomtaxibackendapi.herokuapp.com/api/v1/auth/google" className=""><img style={{width:"40px",height:"40px"}} src="public/assets/images/google.png"  />
                                                
                                                  </a>

                                                   <a style={{width:"60px",marginRight:"5px", height:"40px"}} href="https://goomtaxibackendapi.herokuapp.com/api/v1/auth/instagram" className="">
                                                    <img style={{width:"30px",height:"30px"}} src="public/assets/images/instagram.png"  />
                                                  </a>

                                                  <a style={{width:"60px",marginRight:"5px", height:"40px"}}   href="https://goomtaxibackendapi.herokuapp.com/api/v1/auth/facebook" className="">
                                                    <img style={{width:"25px",height:"25px"}} src="public/assets/images/facebook2.png"  />
                                                  </a>
              </div>
            </div>
            

          </form>


        </div>
        
          <div className="row m-t-20">
            <div className="col-sm-12 text-center">
              <p>
                Already have an account? <a href="./" className="text-primary m-l-5"><b>Login</b></a>
              </p>
            </div>
          </div>










         
                                   
        
        
      
        
      </div></div>



        <div id="myModal"  className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" style={{top:"50px", width:"600px"}}>
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                    <h4 className="modal-title" id="myModalLabel">Modal Heading</h4>
                                                </div>
                                                <div className="modal-body">
                                                    <h4>Text in a modal</h4>
                                                    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                                                    <hr/>
                                                    <h4>Overflowing text to show scroll behavior</h4>
                                                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                                                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                                                    
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary waves-effect waves-light">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                   

                                   

         </React.Fragment>
    );
  }
}



export default Register;
