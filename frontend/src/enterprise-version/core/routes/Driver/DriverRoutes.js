import React, { useState, useEffect } from 'react';
import { Route, Redirect, HashRouter as Router, BrowserRouter, Switch } from 'react-router-dom';

//driver
import HomeLoginDriver from '../../../views/Drivers/Driver/Home/Home';
import RegisterDriver from '../../../views/Drivers/Driver/Register/Register';
import ForgotPasswordDriver from '../../../views/Drivers/Driver/ForgotPassword/ForgotPassword';
import DashboardDriver from '../../../views/Drivers/Driver/Dashboard/Dashboard';
import ItineraryHistoryDriver from '../../../views/Drivers/Driver/Dashboard/ItineraryHistory';
import MechanicRequestDriver from '../../../views/Drivers/Driver/MechanicRequest/MechanicRequest';
import ProfileDriver from '../../../views/Drivers/Driver/Profile/Profile';
import Ratings from '../../../views/Drivers/Driver/Profile/Ratings';
import SOSRequestDriver from '../../../views/Drivers/Driver/SOS/SOS';
import TicketRequestDriver from '../../../views/Drivers/Driver/Ticket/Ticket';
import TicketHistoryDriver from '../../../views/Drivers/Driver/Ticket/SubmittedTicket';
import FAQHistoryDriver from '../../../views/Drivers/Driver/Faq/Faq';
import SubmittedSOSDriver from '../../../views/Drivers/Driver/SOS/SOSHistory';
import MechanicRequestDriverHistory from '../../../views/Drivers/Driver/MechanicRequest/MechanicRequestHistory';
import NotificationsDriver from '../../../views/Drivers/Driver/Notifications/notifications';
import AssignedVehicleHistory from '../../../views/Drivers/Driver/Profile/assignedVehicleHistory';
import CompletedTripsContent from '../../../views/Drivers/Driver/Trips/completedTrips';
import UpcomingTripsContent from '../../../views/Drivers/Driver/Trips/upcomingTrips';
import TripDetailContent from '../../../views/Drivers/Driver/Trips/tripDetail';
import NotFoundPage from '../../../views/404Page/NotFound';
import Forbidden from '../../../views/403/Forbidden';

//main activity

import axios from 'axios';

import Login from '../../../views/Drivers/Driver/Login';
import EmbeddedMap from '../../../views/Drivers/Driver/Map/EmbedMap';

//import Mapp from '../../../views/Drivers/map'

const DriverRouter = props => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getCurrentUser = () => {
    const user = sessionStorage.getItem('user');
    return user ? user : false;
  };

  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* drivers routes completed ...*/}

          <Route path="/" exact component={HomeLoginDriver} />
          <Route path="/login" component={HomeLoginDriver} />
          <Route path="/dashboard" component={DashboardDriver} />
          <Route path="/signup" component={RegisterDriver} />
          <Route path="/recovery" component={ForgotPasswordDriver} />
          <Route path="/profile" component={ProfileDriver} />
          <Route path="/drivers-ratings" component={Ratings} />
          <Route path="/sos-request" component={SOSRequestDriver} />
          <Route path="/sos-history" component={SubmittedSOSDriver} />
          <Route path="/request-car-repair" component={MechanicRequestDriver} />
          <Route path="/request-repairs-history" component={MechanicRequestDriverHistory} />
          <Route path="/createticket" component={TicketRequestDriver} />
          <Route path="/submittedticket" component={TicketHistoryDriver} />
          <Route path="/faqs" component={FAQHistoryDriver} />
          <Route path="/notifications" component={NotificationsDriver} />
          <Route path="/assignedvehiclehistory" component={AssignedVehicleHistory} />
          <Route path="/completedtrips" component={CompletedTripsContent} />
          <Route path="/upcomingtrips" component={UpcomingTripsContent} />
          <Route path="/tripdetail" component={TripDetailContent} />
          <Route exact path="/previledges-denied" component={Forbidden} />

          {/*main activity*/}
          <Route
            exact
            path="/login-drivers"
            render={props =>
              getCurrentUser() ? <Redirect to="/map-viewer" /> : <Login {...props} />
            }
          />

          <Route
            exact
            path="/map-viewer"
            render={props =>
              getCurrentUser() ? <EmbeddedMap {...props} /> : <Redirect to="/login" />
            }
          />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default DriverRouter;
