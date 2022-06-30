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

  const isAdmin = () => {
    const user = sessionStorage.getItem('user');
    return user && JSON.parse(user).roles === 'admin' ? user : false;
  };
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* drivers routes completed ...*/}

          <Route path="/" exact component={HomeLoginDriver} />
          <Route path="/drivers-login" component={HomeLoginDriver} />
          <Route path="/dashboard-driver" component={DashboardDriver} />
          <Route path="/drivers-signup" component={RegisterDriver} />
          <Route path="/recovery-driver" component={ForgotPasswordDriver} />
          <Route path="/drivers-profile" component={ProfileDriver} />
          <Route path="/drivers-ratings" component={Ratings} />
          <Route path="/drivers-sos-request" component={SOSRequestDriver} />
          <Route path="/drivers-sos-history" component={SubmittedSOSDriver} />
          <Route path="/drivers-request-car-repair" component={MechanicRequestDriver} />
          <Route path="/drivers-request-repairs-history" component={MechanicRequestDriverHistory} />
          <Route path="/drivers-createticket" component={TicketRequestDriver} />
          <Route path="/drivers-submittedticket" component={TicketHistoryDriver} />
          <Route path="/drivers-faqs" component={FAQHistoryDriver} />
          <Route path="/drivers-notifications" component={NotificationsDriver} />
          <Route path="/drivers-assignedvehiclehistory" component={AssignedVehicleHistory} />
          <Route path="/drivers-completedtrips" component={CompletedTripsContent} />
          <Route path="/drivers-upcomingtrips" component={UpcomingTripsContent} />
          <Route path="/drivers-tripdetail" component={TripDetailContent} />
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
