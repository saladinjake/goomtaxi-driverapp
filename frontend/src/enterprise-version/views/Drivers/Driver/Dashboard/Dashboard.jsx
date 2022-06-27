import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItineraryHistoryList from '../History/ItineraryHistoryList'
import $ from 'jquery';
const activeUrl ="https://goomtaxibackendapi.herokuapp.com/api/v1";


export  default class Dashboard extends Component {
  
  

  componentDidMount() {
     let mainNav;
     if (document.getElementById("loggedInOnly") ) {
            mainNav = document.getElementById("loggedInOnly");
            mainNav.style.display="block";
            mainNav.style.opacity=1;

    }

    if(localStorage.getItem('userToken')){
       let user  = JSON.parse(localStorage.getItem('userToken'));
       document.getElementById("userWelcomeSection").innerHTML = "Welcome " + user.user.firstname + ", How is your day going";
       document.getElementById("plan-id").innerHTML=user.user.plan_name;

    }

  

  }

  goAway(url){
   return window.location.href=url;
  }

  render() {
    const style1 ={
        visibility:"hidden", 
        display:"none"
    }
   
    return (
      

      <div  className="content-page page-wrap" id="spread-out">
                
                <div className="content" id="dashboard">
                    <div className="container" id="trips-assigned">


                        
                        <div className="row">
                            <div className="col-sm-12">
                               

                                <h4 className="page-title">Dashboard</h4>
                                <p id="userWelcomeSection" className="text-muted page-title-alt"> </p>
                            </div>
                        </div>

                        <div className="row">


                        
                        

                            

                            <a id="plan-detail" href="./drivers-completedtrips">
                            <div data-id="plan-detail" data-href="" className="col-sm-6  col-md-6 col-lg-3">
                            <div className="widget-bg-color-icon card-box p-t-10 p-b-10">
                                    <div className="text-dark bg-icon bg-icon-custom pull-left">
                                        
                                         <i className="md-flag text-custom"></i>
                                    </div>
                                    <div className="col-lg-6 pull-right text-right">
                                     <h3 className="text-dark" style={{fontSize:"14px"}}><b className="">Finished Bookings/Trips</b></h3>
                                        <p className="text-muted"></p><p className="text-muted"></p>
                                        <h5 className="text-dark"><b style={{fontSize:"14px",display:"none"}} className="" id="plan-id"></b></h5>
                                        <p className="text-muted" style={{display:"none"}} id="idvalue">No plan id</p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div></div></a>


                            <a  id="topup-wallet" href="./drivers-upcomingtrips"><div className="col-sm-6  col-md-6 col-lg-3 bg-red">
                                <div className="widget-bg-color-icon card-box">
                                    <div className="bg-icon bg-icon-custom pull-left">
                                         <i className="md-directions-car text-custom"></i>
                                    </div>
                                    <div className="col-lg-6 pull-right text-right">
                                        <h3 className="text-dark" style={{fontSize:"14px"}}><b className="">Upcoming Trips</b></h3>
                                        <p className="text-muted"></p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div></a>

                            <a  id="plan" href="./drivers-profile"><div className="col-sm-6  col-md-6 col-lg-3">
                                <div className="widget-bg-color-icon card-box">
                                    <div className="bg-icon bg-icon-info pull-left">
                                        <i className="md md-add text-info"></i>
                                    </div>
                                    <div className="col-lg-6 pull-right text-right">
                                    <h3 className="text-dark" style={{fontSize:"14px"}}><b className="">
                                            <span> Profile</span></b></h3>
                                        <h3 className="text-dark" style={{fontSize:"14px"}}><b className="">
                                            <span style={style1} > Profile</span></b></h3>
                                        <p className="text-muted"></p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div></a>

                            <a id="request-car-repair" href="./drivers-ratings"><div className="col-sm-6  col-md-6 col-lg-3">
                                <div className="widget-bg-color-icon card-box">
                                    <div className="bg-icon bg-icon-custom pull-left">
                                        <i className="md-star text-custom"></i>
                                    </div>
                                    <div className="col-lg-6 pull-right text-right">
                                        <h3 className="text-dark" style={{fontSize:"14px"}}><b className="">Ratings <span style={style1}></span> repair</b></h3>
                                        <p className="text-muted"></p>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div></a>
                        </div>

                   
                        
                         <div className="row">

                            


                            <div className="col-lg-12">
                                <div className="card-box">
                                 

                                  <br/>


                                    <h4 className="text-dark header-title m-t-0">Finished Trips</h4>
                                
                                        
                                               
                                    

                                    <div className="table-responsive card-box">
                                             <br/>
                                              <div className="col-sm-6 text-lg-center text-right pull-right">
                                                    <div className="form-group">
                                                        <input id="foo-table-input" type="text" placeholder="Search by location" className="form-control input-sm" autoComplete="on" />
                                                    </div>
                                                </div>
                                                <div className="clearfix"></div>
                            <div className="m-t-10" style={{border:"1px solid #4c3392"}}></div>

                              <div className="portlet">
                                    <div className="portlet-heading ">
                                        <h3 className="portlet-title">
                                            Primary Heading
                                        </h3>
                                        <div className="portlet-widgets">
                                            <a href="javascript:;" data-toggle="reload"><i className="ion-refresh"></i></a>
                                            <span className="divider"></span>
                                            <a data-toggle="collapse" data-parent="#accordion1" href="#bg-primary" className="" aria-expanded="true"><i className="ion-minus-round"></i></a>
                                            <span className="divider"></span>
                                            <a href="#" data-toggle="remove"><i className="ion-close-round"></i></a>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div id="bg-primary" className="panel-collapse collapse in" aria-expanded="true" >
                                        <div className="portlet-body">
                                            <table id="demo-foo-pagination" data-page-size="7" 
                                           data-search="true" className="table toggle-circle table-hover">

                                            <thead>
                                                <tr id="completed-trips">

                                                

                                                  <th className="col-lg-2">Date Time</th>
                   
                    <th>User Name</th>
                    <th>User Email</th>
                     <th className="">Pickup Location</th>
                      <th className="">Destination Location</th>
                       <th className="">Status</th>
                    <th>Rating</th>
                    <th style={{ minWidth: 90 }}>Action</th>
                                                   
                                                </tr>
                                            </thead>
                                           
                                            <tbody id="tablebodyc">
                                                
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colSpan="5">
                                                    <div className="text-right">
                                                        <ul className="pagination pagination-split m-t-30"></ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                                        
                                    </div>

                                </div>
                            </div>
                           

                        </div>
                      



                        <div className="row">

                            

                            <div className="col-lg-12">
                                <div className="card-box">
                                    
                                    <h4 className="text-dark header-title m-t-0">Upcomming Itineraries</h4>
                                    <p className="text-muted m-b-30 font-13">
                                        
                                    </p>

                                    <div className="table-responsive card-box">
                                       <div className="clearfix"></div>
                            <div className="m-t-10" style={{border:"1px solid #4c3392"}}></div>
                                        <table className="table table-actions-bar">
                                            <thead>
                                               <th>Date</th>
                                               <th>User Name</th>
                    <th>User Email</th>
                    <th className="">Pickup Location</th>
                    <th className="">Destination</th>
                     <th className="">Status</th>
                    <th>Rating</th>
                    <th style={{ minWidth: 90 }}>Action</th>
                                            </thead>
                                            <tbody id="tablebody1">
                                                
                                               

                                            </tbody>
                                        </table>
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






