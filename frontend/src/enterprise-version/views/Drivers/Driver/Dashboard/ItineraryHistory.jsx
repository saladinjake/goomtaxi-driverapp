import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItineraryHistoryList from '../History/ItineraryHistoryList'

const activeUrl ="https://goomtaxibackendapi.herokuapp.com/api/v1";


export  default class Dashboard extends Component {
  
  

  componentDidMount() {
     let mainNav;
     if (document.getElementById("loggedInOnly") ) {
            mainNav = document.getElementById("loggedInOnly");
            mainNav.style.display="block";
            mainNav.style.opacity=1;

    }

   

  }

  render() {
    const style1 ={
        visibility:"hidden", 
        display:"none"
    }
   
    return (
      

      <div className="content-page page-wrap" id="spread-out">
                
                <div className="content" id="itinerary-history">
                    <div className="container">

                       

                   
                        
                         <div className="row">

                            


                            <div className="col-lg-12">
                                <div className="card-box">
                                
                                  
                                    <h4 className="text-dark header-title m-t-0">Upcoming Itineraries</h4>
                                    <p className="text-muted m-b-30 font-13">
                                        
                                    </p>

                                    <div className="table-responsive">
                                     <div className="clearfix"></div>
                            <div className="m-t-10" style={{border:"1px solid #4c3392"}}></div>
                                       <table id="demo-foo-pagination" data-page-size="5" 
                                           data-search="true" className="table toggle-circle table-hover">
                                            <thead>
                                                <tr>
                                                    <th data-toggle="true" className="col-lg-4">Created Date</th>
                                                    <th data-hide="phone" className="col-lg-4">Plan Category</th>
                                                    <th data-hide="phone" className="col-lg-4">Start Location</th>
                                                    <th data-hide="phone" className="col-lg-3">Destination</th>
                                                    <th data-hide="phone" className="col-lg-4">Start Time</th>
                                                    <th data-hide="phone" className="col-lg-2">Drive Option</th>
                                                    <th data-hide="phone" className="col-lg-2">Duration (hrs)</th>
                                                     <th data-hide="all" className="col-lg-2">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tablebody-it">
                                                
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
                      



                       

<a id="portfolio" style={{textAlign:"center",fontSize:"15px"}} href="./create-plan" className="link-to-portfolio hover-target">+</a>
                    </div> 

                </div>


            </div>


           
            
            
            
            
    );
  }

}






