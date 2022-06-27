'use strict';
import WebsiteLogin from '../core/Login';
import WebsiteSignUp from '../core/SignUp';
import WebsitePasswordReset from '../core/ForgotPassword';
import WebsiteProfile from '../frontend/controllers/Profile';
import WebsitePlanCategory from '../frontend/controllers/Plan';

import WebsiteFeedback from '../frontend/controllers/Feedback';
import WebsiteSOS from '../frontend/controllers/SOS';
import WebsiteLoading  from '../core/Loading';
import WebsiteHome from '../frontend/controllers/Home';
import WebsiteItineraryHistory from '../frontend/controllers/ItineraryHistory';
import WebsitePlanHistory from '../frontend/controllers/PlanHistory';
import WebsiteSingleRecord from '../frontend/controllers/PlanDetail';
import WebsiteFaqs from '../frontend/controllers/FAQ';
import WebsiteRepairs from '../frontend/controllers/CarRepair';
import Ewallet from '../frontend/controllers/Wallet';
import QuotationHistory from "../frontend/controllers/QuotationHistory";
import PaymentHistory from "../frontend/controllers/PaymentHistory";
import PaymentWizard from "../frontend/controllers/PaymentWizard";
import Notification from '../frontend/controllers/Notification';
import DriversAssignment from '../frontend/controllers/DriversAssignment';

import MenuRenderer from '../core/MenuTemplate';
import Cusor from '../frontend/controllers/Cusor';
 



const FrontendRepoBootstrap = {
  Menu: new MenuRenderer(),
  SignUp: new WebsiteSignUp(), //Registers Users online
   Login: new WebsiteLogin(), //Logs user in
  Home: new WebsiteHome(), // Usr dashpane
  PasswordReset: new WebsitePasswordReset(),
  Profile: new WebsiteProfile(),
  ItineraryHistory: new WebsiteItineraryHistory(),
  PlanHistory: new WebsitePlanHistory(),
  PlanCategorySelect: new WebsitePlanCategory(),
  Faqs: new WebsiteFaqs(),
  
  Feedback:  new WebsiteFeedback(),
  SOS: new WebsiteSOS(),
  PlanDetail: new WebsiteSingleRecord(),
  Repairs: new WebsiteRepairs(),
  Ewallets: new Ewallet(),
  QuotationHistorys: new QuotationHistory(),
  PaymentHistorys: new PaymentHistory(),
  PaymentWizardz: new PaymentWizard(),
  Notice: new Notification(),
  
};
export default FrontendRepoBootstrap;
