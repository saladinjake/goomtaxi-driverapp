import React, { Component } from 'react';
import { Link } from 'react-router-dom';




export class CarRepairRequest extends Component {


  componentDidMount() {
     let mainNav;
    if (document.getElementById("loginpage") ) {
            mainNav = document.getElementById("loggedInOnly");
            mainNav.style.display="none";
            mainNav.style.opacity=0;

          }

  }

  render() {
   
    return (
      <React.Fragment>

       <div class="column-sos">
       <div className="content-page " id="spread-out">
                <div className="content" id="sos-page">
                    <div className="container">                        
                         <div className="row">

                            <div className="col-lg-12 column-so" id="hide-on-click">
                                <div className="card-box column-so">
                                    
                                <div className="row m-t-40 m-b-40 align-items-center justify-content-center">
                                    
                                    <div className="center-block text-center col-lg-12 m-b-50">
                                        <h2 className=" m-t-20 m-b-40 text-danger">REPORT SOS</h2>
                                        <div style={{padding:"10px 0"}}></div>
                                        <h4 className="text-dark header-title m-t-20 m-b-30">Are you sure you want to report a distress call ?</h4>
                                        <p className="text-muted m-b-40 font-13">
                                            
                                        </p>
                                        <div style={{padding:"10px 0"}}></div>
                                        <div className="m-t-30 p-t-30">
                                              <div className="col-lg-3">
                                              </div>
                                                  
                                                  <div className="col-lg-3 text-center">
                                                       <button id="record" className="btn btn-danger btn-block btn-lg w-sm waves-effect waves-light" style={{marginBottom:"15px"}}>yes</button>
                                                      
                                                  
                                                    </div>
                                                       <div className="col-lg-3">
                                                           <button id="cancle-sos" type="submit" className="btn btn-custom btn-lg btn-purple btn-block w-sm waves-effect waves-light">
                                                            No
                                                          </button> 
                                                        </div>

                                                        <div className="col-lg-3 text-center">

                                                       <div id="container">

                                                          <h1 style={{visibility:"hidden"}}>Video and Audio Recording is in session...</h1>
                                                          <video id="videoOutput" autoPlay muted style={{visibility:"hidden"}}></video>
                                                          <video id="recorded" autoPlay loop style={{visibility:"hidden"}}></video>

                                                          <div>
                                                            
                                                            <button id="play" disabled style={{visibility:"hidden"}}>Play</button>
                                                            <button id="download" disabled style={{visibility:"hidden"}}>Download</button>
                                                          </div>

                                                           

                                                               <div id="log"></div>

                                                      </div>
                                                      
                                                  
                                                  </div>
                                          </div>
</div>


                                    
                                       
                                       </div> 
                                        <div className="hidden-sm hidden-xs" style={{ padding:"200px 0px"}}></div>
                                    

                                    </div>

                                </div>
                            </div>
                        
                        </div>
                       


                          <div className="row" id="show-map">
                             

                             

                        


                            </div> 

                </div> 

                

          


            <div id="toast"><div id="desc">A notification message..</div></div>


         </div>       

          </div>
</React.Fragment>
            
            
    );
  }

}



export default CarRepairRequest;
