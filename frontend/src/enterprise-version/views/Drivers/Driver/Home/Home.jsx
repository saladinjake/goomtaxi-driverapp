/* eslint-disable global-require */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


export class Home extends Component {
  render() {
    const styleM= { background:'#fff url("public/assets/images/products/home2.jpg") no-repeat fixed left', backgroundSize:'contain', height:"100%",position:"fixed"};  
    const styleY ={padding:"43% 0px" }
    return (
       <React.Fragment>
            <div id="main-content" className="col-lg-8 col-md-6 hidden-md-down hidden-xs hidden-sm "  id="loginpage" style={styleM}>
              <div style={styleY} ></div>
            </div>
            
          
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pull-right" id="drivers-login">
                <div className="card-box">
                      <div className="panel-heading">
          <h1 className="text-custom m-t-40 m-b-20 text-left" style={{fontWeight:'700', letterSpacing:"3px", color: "rgb(126, 87, 194)"}}>Sign in</h1>
                <a href="./drivers-signup" className="btn-link" style={{textDecoration:"none"}}>or create an account</a>

              
        </div>

                      <div className="panel-body">
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

                                <form className="form-horizontal m-t-20" method="POST" action="http://localhost:12000/api/v1/auth/drivers-login">

                                  
                                  <div className="form-group ">
                                    <div className="col-xs-12">
                                      <input className="form-control" type="text" id="userName" required="" placeholder="Email " />
                                    </div>
                                  </div>



                                  <div className="form-group">
                                    <div className="col-xs-12">
                                      <input className="form-control" id="userPw" type="password" required="" placeholder="Password" />
                                      <span toggle="#userPw" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                    </div>
                                  </div>

                               

                                  <div className="form-group text-center m-t-40">
                                    <div className="col-xs-12">
                                      <button style={{backgroundColor: "#7e57c2"}} id="login_btn" className="btn btn-info btn-block text-uppercase waves-effect waves-light btn-facebook waves-effect waves-light m-t-20" type="submit">
                                        Log In
                                      </button>
                                    </div>
                                  </div>

                                  <div className="form-group m-t-20 m-b-0">
                                    <div className="col-sm-12">
                                      <a href="./recovery-driver" className="text-dark"><i className="fa fa-lock m-r-5"></i> Forgot your password?</a>
                                    </div>
                                  </div>
                                  
                                  <div className="form-group m-t-20 m-b-0">
                                    <div className="col-sm-12 text-center">
                                      <h4><b>Sign in with</b></h4>
                                    </div>
                                  </div>
                                  
                                  <div className="form-group m-b-0 text-center">
                                    <div className="col-sm-12">

                                      <a style={{width:"60px",marginRight:"5px", height:"40px"}}  href="http://localhost:12000/api/v1/auth/google" className=""><img style={{width:"40px",height:"40px"}} src="public/assets/images/google.png"  />
                                                
                                                  </a>

                                                   <a style={{width:"60px",marginRight:"5px", height:"40px"}} href="http://localhost:12000/api/v1/auth/instagram" className="">
                                                    <img style={{width:"30px",height:"30px"}} src="public/assets/images/instagram.png"  />
                                                  </a>

                                                  <a style={{width:"60px",marginRight:"5px", height:"40px"}}   href="http://localhost:12000/api/v1/auth/facebook" className="">
                                                    <img style={{width:"25px",height:"25px"}} src="public/assets/images/facebook2.png"  />
                                                  </a>
                                    </div>
                                  </div>
                                </form>


                            </div>
                
                            <div className="row m-t-20">
                            <div className="col-sm-12 text-center">
                              <p>
                                Don't have an account? <a href="./drivers-signup" className="text-primary m-l-5"><b>Sign Up</b></a>
                              </p>
                            </div>
                          </div>
            

            </div>
            </div>
         </React.Fragment>
    );
  }
}



export default Home;
