import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
//user
import HomeLogin from '../../../views/User/Home/Home';
import Register from '../../../views/User/Register/Register';
import ForgotPassword from '../../../views/User/ForgotPassword/ForgotPassword';
import Dashboard from '../../../views/User/Dashboard/Dashboard';
import ItineraryHistory from '../../../views/User/Dashboard/ItineraryHistory';
import PlanHistory from '../../../views/User/Dashboard/PlanHistory';
import SingleRecord from '../../../views/User/SingleRecord/SingleRecord';
import Plan from '../../../views/User/Plan/Plan';
import MechanicRequest from '../../../views/User/MechanicRequest/MechanicRequest';
import Profile from '../../../views/User/Profile/Profile';
import SOSRequest from '../../../views/User/SOS/SOS';
import TicketRequest from '../../../views/User/Ticket/Ticket';
import TicketHistory from '../../../views/User/Ticket/SubmittedTicket';
import FAQHistory from '../../../views/User/Faq/Faq';
import SubmittedSOS from '../../../views/User/SOS/SOSHistory';
import Wallet from '../../../views/User/Wallet/WalletHome';
import WalletHistory from '../../../views/User/Wallet/WalletHistory'
import QuoteSubscriptionHistory from '../../../views/User/Wallet/QuoteSubscriptionHistory'
import MechanicRequestHistory from '../../../views/User/MechanicRequest/MechanicRequestHistory';
import PayAction from  "../../../views/User/PayAction/PayAction";
import Map from '../../../views/User/Map/Map';
import Notifications from '../../../views/User/Notifications/notifications'

import NotFoundPage from '../../../views/404Page/NotFound';
import Forbidden from '../../../views/403/Forbidden';

import LaunchPad from '../../../views/LaunchPad/GoomLaunchpad'
//import Mapp from './components/map'

const UserRouter = () => { 
	return (
	<>
		<BrowserRouter>
		  <Switch>
		   {/* user routes completed ...*/}

		     <Route exact path="/" component={HomeLogin} />
		     <Route exact path="/index.html" component={HomeLogin} />
		     <Route exact path="/signup" component={Register} />
		     <Route exact path="/recovery" component={ForgotPassword} />
		     <Route exact path="/dashboard" component={Dashboard} />
		     <Route exact path="/plan-history" component={PlanHistory} />
		    <Route exact path="/itinerary-history" component={ItineraryHistory} />
		    <Route exact path="/submitted-ticket" component={TicketHistory} />
		    <Route exact path="/faqs" component={FAQHistory} />
		    <Route exact path="/sos-history" component={SubmittedSOS} />
            <Route exact path="/create-plan" component={Plan} />
		    <Route exact path="/profile" component={Profile} />
		    <Route  exact path="/sos-request" component={SOSRequest} />
		    <Route  exact path="/create-ticket" component={TicketRequest} />
		    

			<Route exact path="/plan" component={Plan} />

			<Route exact path="/service-categories" component={LaunchPad} />

		    <Route exact path="/request-car-repair" component={MechanicRequest} />
		    <Route exact path="/request-repairs-history" component={MechanicRequestHistory} />
		    <Route exact path="/wallet" component={Wallet} />
		    <Route exact path="/paid-history" component={WalletHistory} />
		    <Route exact path="/quote-subscription-history" component={QuoteSubscriptionHistory} />
            <Route exact path="/plan-detail" component={SingleRecord} />

            <Route exact path="/pay-action" component={PayAction} />
            <Route exact path="/gtd-event" component={Map} />
            <Route exact path="/notification" component={Notifications} />
            <Route exact path="/previledges-denied" component={Forbidden} />
		    <Route path="*" component={NotFoundPage} />


		  </Switch>
	  </BrowserRouter>
  </>
);

	}

export default UserRouter;
